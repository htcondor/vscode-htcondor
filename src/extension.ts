// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { JobProvider } from "./treeview";
import { exec, ChildProcess } from 'child_process';
import axios from 'axios';

export async function showJobDetails(jobId: number) {
	try {
		// 1. Fetch the job details
		const response = await axios.get(`http://127.0.0.1:5000/jobs/${jobId}`);
		const jobDetails = response.data[0]; // Assuming the response always has an array with one element.

		// 2. Create the Webview Panel
		const panel = vscode.window.createWebviewPanel(
			'jobDetails', // Identifies the type of the webview. Used internally
			`Job Details: ${jobId}`, // Title of the panel displayed to the user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in.
			{} // Webview options. More on these later.
		);

		// 3. Render the job details

		// Option A: Pretty print the entire JSON
		// const html = `<pre>${JSON.stringify(jobDetails, null, 4)}</pre>`;

		// Option B: Display the 10 most important fields (change fields as needed)
		const importantFields = ["JobID", "Status", "Args", "Cmd", "Owner", "JobStatus", "ProjectName", "User", "JobStartDate", "JobRunCount"];
		let content = '';
		for (const field of importantFields) {
			content += `<strong>${field}:</strong> ${jobDetails[field]}<br>`;
		}
		const html = `<div>${content}</div>`;

		panel.webview.html = html;
	} catch (error: any) {
		vscode.window.showErrorMessage(`Failed to fetch job details: ${error.message}`);
	}
}


async function fetchJobs(): Promise<{ JobID: number, Status: string }[]> {
	try {
		const response = await axios.get('http://127.0.0.1:5000/jobs');
		if (response.status === 200 && Array.isArray(response.data)) {
			return response.data.map(job => ({
				JobID: job.JobID,
				Status: getStatusDescription(job.Status)  // Map status code to description
			}));
		} else {
			vscode.window.showErrorMessage('Failed to fetch jobs.');
			return [];
		}
	} catch (error) {
		vscode.window.showErrorMessage('Error fetching jobs.');
		console.error(error);
		return [];
	}
}

// Map status codes to descriptions
// This is just an example, modify according to your needs
function getStatusDescription(statusCode: number): string {
	switch (statusCode) {
		case 1:
			return 'Idle';
		case 2:
			return 'Running';
		case 3:
			return 'Removed';
		case 4:
			return 'Completed';
		case 5:
			return 'Held';
		default:
			return 'Unknown';
	}
}


let flaskAppProcess: ChildProcess | null = null;

function startFlaskApp() {
	const flaskAppPath = path.join(__dirname, 'flask_app');
	console.log(__dirname);
	console.log(flaskAppPath);
	flaskAppProcess = exec(flaskAppPath, (error, stdout, stderr) => {
		if (error) {
			if (error.message.includes('Address already in use')) {
				console.log('Server is already started on port 5000.');
			} else {
				vscode.window.showErrorMessage('Failed to start the Flask app.');
				console.error(`exec error: ${error}`);
			}
			return;
		}
		console.log(`Flask App STDOUT: ${stdout}`);
		console.log(`Flask App STDERR: ${stderr}`);
	});
}

class DocHoverProvider implements vscode.HoverProvider {
	provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.Hover> {
		return new Promise((resolve, reject) => {
			let wordRange = document.getWordRangeAtPosition(position);
			let keyword = document.getText(wordRange);

			if (fs.existsSync(path.join(__dirname, "../md_files", keyword + ".md"))) {
				// Read the arguments.html file
				let htmlContent = fs.readFileSync(path.join(__dirname, "../md_files", keyword + ".md"), "utf8");
				let markdown = new vscode.MarkdownString(htmlContent, true);
				markdown.supportHtml = true;
				resolve(new vscode.Hover(markdown));
			} else {
				reject();
			}
		});
	}
}

class DocCompletionItemProvider implements vscode.CompletionItemProvider {
	provideCompletionItems(
		document: vscode.TextDocument,
		position: vscode.Position,
		token: vscode.CancellationToken,
		context: vscode.CompletionContext
	): Thenable<vscode.CompletionItem[]> {
		return new Promise((resolve, reject) => {
			let wordRange = document.getWordRangeAtPosition(position);
			let keyword = document.getText(wordRange);

			// get list of commands via the markdown files in the md_files directory
			let commands: vscode.CompletionItem[] = [];
			fs.readdirSync(path.join(__dirname, "../md_files")).forEach((file) => {
				let command = new vscode.CompletionItem(file.replace(".md", ""), vscode.CompletionItemKind.Keyword);
				commands.push(command);
			});
			return resolve(commands);
		});
	}
}



// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "htc" is now active!');
	startFlaskApp();
	context.subscriptions.push(vscode.languages.registerHoverProvider("htcondor", new DocHoverProvider()));
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider("htcondor", new DocCompletionItemProvider(), " "));
	context.subscriptions.push(
		vscode.commands.registerCommand('htcondor.selectLogFile', async () => {
			// Here you'll place the code to prompt the user to select the log file
			const uris = await vscode.window.showOpenDialog({
				canSelectMany: false,
				openLabel: 'Open',
				filters: {
					'Log files': ['log']
				}
			});

			if (uris && uris.length) {
				const selectedPath = uris[0].fsPath;
				// Do something with the selected path
				vscode.workspace.getConfiguration("htc").update("logFile", selectedPath, vscode.ConfigurationTarget.Global);
				console.log(selectedPath);
			}
		})
	);
	// register tree view
	let jobProvider = new JobProvider();
	vscode.window.registerTreeDataProvider("htcondor", jobProvider);

	let disposable = vscode.commands.registerCommand('htcondor.showJobs', async () => {
		const jobs = await fetchJobs();
		if (!jobs || jobs.length === 0) {
			vscode.window.showInformationMessage('No jobs found.');
			return;
		}

		const quickPick = vscode.window.createQuickPick();
		quickPick.items = jobs.map(job => ({
			label: `JobID: ${job.JobID}`,
			description: `Status: ${job.Status}`,
			detail: 'More details...',  // this can be a hint that they can click to get more details
			jobId: job.JobID  // you can attach custom properties to your QuickPick items
		}));

		quickPick.onDidAccept(() => {
			const selectedItem = quickPick.selectedItems[0] as any;
			if (selectedItem && selectedItem.jobId) {
				vscode.commands.executeCommand('htcondor.showJobDetails', selectedItem.jobId);
			}
			quickPick.hide();
		});

		quickPick.show();
	});
	
	context.subscriptions.push(disposable);

	let jobDetailsProvider = new JobDetailsProvider();
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider('htcondor.jobDetails', jobDetailsProvider)
	);
	vscode.commands.registerCommand('htcondor.showJobDetails', async (jobId) => {
		// Fetch job details as before...
		const response = await axios.get(`http://127.0.0.1:5000/jobs/${jobId}`);
		const jobDetails = response.data[0];

		// Update the side view with the job details
		jobDetailsProvider.setJobDetails(jobDetails);
	});


}

class JobDetailsProvider implements vscode.WebviewViewProvider {
	private _view?: vscode.WebviewView;

	resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, _token: vscode.CancellationToken) {
		this._view = webviewView;

		// Set initial content
		this._view.webview.html = 'Select a job to view its details.';
	}

	// You can call this method when you want to update the view
	setJobDetails(jobDetails: any) {
		if (!this._view) {
			return;
		}
		const importantFields = ["ClusterId", "JobStatus", "JobUniverse", "Args", "Cmd", "Owner", "JobStatus", "ProjectName", "User", "JobStartDate", "JobRunCount"];
		const displayData = {
			// Extract the 10 most important fields or however you want to format the data
			
		};
		let content = '';
		for (const field of importantFields) {
			content += `<strong>${field}:</strong> ${jobDetails[field]}<br>`;
		}
		const html = `<div>${content}</div>`;

		this._view.webview.html = html
	}
}

// This method is called when your extension is deactivated
export function deactivate() {
	console.log("deactivated");
	if (flaskAppProcess) {
		flaskAppProcess.kill();
		flaskAppProcess = null;
	}
}
