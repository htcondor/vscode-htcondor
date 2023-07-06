// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { JobProvider } from "./treeview";
var htcondor = require("htcondor");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "htc" is now active!');
	// register tree view
	vscode.window.registerTreeDataProvider("htcondor.jobs", new JobProvider());
	vscode.window.registerTreeDataProvider("htcondor.jobs.explorer", new JobProvider());
	//watchLogFile("test.log");
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand("htc.submit", async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user

		// prompt user for job submission file
		// let workspaceFolder = vscode.workspace.workspaceFolders
		// 	? vscode.workspace.workspaceFolders[0]
		// 	: null;
		// if (workspaceFolder) {
		// 	let workspaceFiles = workspaceFolder.uri.fsPath;
		// 	let files = await vscode.workspace.findFiles("**/*.*");
		// 	let fileNames = files.map((file) => {
		// 		return file.fsPath.replace(workspaceFiles, "");
		// 	});

		// 	let options: vscode.QuickPickOptions = {
		// 		canPickMany: false,
		// 		placeHolder: "Select a file",
		// 	};

		// 	vscode.window.showQuickPick(fileNames, options).then((selectedFile) => {
		// 		if (selectedFile) {
		// 			// Do something with the selected file
		// 		}
		// 	});
		// } else {
		// 	vscode.window.showErrorMessage("No workspace folder found.");
		// }

		vscode.window.showInformationMessage("Submitting to HTCondor");
		//create condor submit object - this could always be parsed from a file
		var submitOptions = {
			executable: "/bin/echo",
			arguments: "Job Executed",
			queue: 2,
		};

		// Submit to start the job
		htcondor.submit(submitOptions).then(function (job: any) {
			JobProvider.watchJob(job);
		});
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
