// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as path from "path";
import { JobProvider } from "./treeview";
import { exec, ChildProcess } from "child_process";
import * as fs from "fs";

let config = vscode.workspace.getConfiguration("htc");
let accessPointStatusItem: vscode.StatusBarItem;
let accessPoint: string = config.get("accessPoint") || "";
let accessPoints: string[] = config.get("accessPoints") || [];
let userName: string = config.get("username") || "";
let tailProcess: ChildProcess | undefined = undefined;
let submitted: Boolean = false;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "htc" is now active!');
	vscode.workspace.getConfiguration("htc");
	vscode.workspace.onDidChangeConfiguration((e) => {
		config = vscode.workspace.getConfiguration("htc");
		if (e.affectsConfiguration("htc.accessPoints")) {
			accessPoints = config.get("accessPoints") || [];
		}
		if (e.affectsConfiguration("htc.username")) {
			userName = config.get("username") || "";
		}
		if (e.affectsConfiguration("htc.accessPoint")) {
			accessPoint = config.get("accessPoint") || "";
		}
	});

	const accessPointCommandId = "htc.ap";
	accessPointStatusItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	accessPointStatusItem.text = accessPoint;
	accessPointStatusItem.command = accessPointCommandId;
	accessPointStatusItem.show();

	// register tree view
	let jobProvider = new JobProvider();
	vscode.window.registerTreeDataProvider("htcondor.jobs", jobProvider);
	vscode.window.registerTreeDataProvider("htcondor.jobs.explorer", jobProvider);

	// register access point command
	const accessPointCommand = vscode.commands.registerCommand("htc.ap", async () => {
		// show quick pick with list of access points
		const options: vscode.QuickPickOptions = {
			canPickMany: false,
			placeHolder: "Select an access point",
		};
		let items = accessPoints.map((ap) => {
			return { label: ap };
		});
		vscode.window.showQuickPick(items, options).then((selection) => {
			if (selection) {
				accessPoint = selection.label;
				accessPointStatusItem.text = "$(server) " + accessPoint;
			}
		});
	});

	const submitCommand = vscode.commands.registerCommand("htc.submit", async () => {
		// show open file dialog
		const files = await vscode.window.showOpenDialog({});
		if (!files || files.length === 0) {
			return;
		}
		const file = files[0];
		const fileName = path.basename(file.fsPath);
		const remotePath = "/home/" + userName + "/" + fileName;
		// get logfile from submit file
		let logFileName = "";
		fs.readFile(file.fsPath, "utf-8", (err, data) => {
			if (err) {
				console.error(`Error reading file: ${err}`);
				return;
			}
			const logFileRegex = /^log\s*=\s*(\S+)/m;
			const match = data.match(logFileRegex);
			if (match) {
				logFileName = match[1];
				let logFilePath = path.dirname(file.fsPath) + "/" + logFileName;
				config.update("logFile", logFilePath);
				// create log file locally with write permissions
				fs.writeFile(logFilePath, '', function (err){
					if (err) {
						console.error(`Error creating file: ${err}`);
						return;
					}
				});
			} else {
				console.error("Log filename not found in submit file");
			}
		});

		// Use SCP to copy the file over SSH
		exec(`scp ${file.fsPath} ${userName}@${accessPoint}:${remotePath}`, (error, stdout, stderr) => {
			if (error) {
				vscode.window.showErrorMessage("Failed to copy file: " + error.message);
				return;
			}

			// Now submit the job using condor_submit
			exec(`ssh ${userName}@${accessPoint} "condor_submit ${remotePath}"`, (error, stdout, stderr) => {
				if (error) {
					vscode.window.showErrorMessage("Failed to submit job: " + error.message);
					return;
				}
				if (stdout) {
					// submit file was successfully submitted
					vscode.window.showInformationMessage(stdout);
				}

				if (!submitted) {
					submitted = true;
					const HOME = "/home/" + userName;
					const PWD = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : "";
					tailProcess = exec(`ssh ${userName}@${accessPoint} "tail -f ${HOME}/${logFileName}" >> ${PWD}/${logFileName}`);
					jobProvider.startWatching();
				}
			});
		});
	});

	context.subscriptions.push(submitCommand, accessPointCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {
	// kill tail process - kills any tail processes running by user on the access point
	exec(`ssh ${userName}@${accessPoint} "pkill tail"`);
}
