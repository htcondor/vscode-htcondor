// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { JobProvider } from "./treeview";
import { exec, ChildProcess } from "child_process";

let accessPointStatusItem: vscode.StatusBarItem;
let accessPoint: string = "128.104.101.92";
let tailProcess: ChildProcess | undefined = undefined;
let submitted: Boolean = false;
var htcondor = require("htcondor");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "htc" is now active!');

	const accessPointCommandId = "htc.accessPoint";
	accessPointStatusItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	accessPointStatusItem.text = accessPoint;
	accessPointStatusItem.command = accessPointCommandId;
	accessPointStatusItem.show();

	// register tree view
	vscode.window.registerTreeDataProvider("htcondor.jobs", new JobProvider());
	vscode.window.registerTreeDataProvider("htcondor.jobs.explorer", new JobProvider());
	//watchLogFile("test.log");
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let pid: number | undefined = undefined;
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

		//vscode.window.showInformationMessage("Submitting to HTCondor");
		//create condor submit object - this could always be parsed from a file
		var submitOptions = {
			executable: "/bin/echo",
			arguments: "Job Executed",
			log: "test.log",
			output: "test.out",
			error: "test.err",
			queue: 1,
		};

		const files = await vscode.window.showOpenDialog({});
		if (!files || files.length === 0) {
			return;
		}

		const file = files[0];
		const fileName = path.basename(file.fsPath);
		const remotePath = "/home/mjhartke/" + fileName;

		// test auth and if it fails, prompt for password

		// exec(`ssh mjhartke@${accessPoint} "echo 'test'"`, (error, stdout, stderr) => {
		// 	if (error) {
		// 		vscode.window.showErrorMessage("Failed to authenticate: " + error.message);
		// 		// prompt for password via input box
		// 		vscode.window.showInputBox({ prompt: "Enter password", password: true }).then((password) => {
		// 			if (password) {
		// 				// authenticate with password without sshpass
		// 				exec(`sshpass -p ${password} ssh mjhartke@submit-2.chtc.wisc.edu "echo 'test'"`, (error, stdout, stderr) => {
		// 					if (error) {
		// 						vscode.window.showErrorMessage("Failed to authenticate: " + error.message);
		// 						return;
		// 					}
		// 					// vscode.window.showInformationMessage("Authenticated successfully!");
		// 				});
		// 			}
		// 		});

		// 		return;
		// 	}
		// });

		// Use SCP to copy the file over SSH
		exec(`scp ${file.fsPath} mjhartke@${accessPoint}:${remotePath}`, (error, stdout, stderr) => {
			if (error) {
				vscode.window.showErrorMessage("Failed to copy file: " + error.message);
				return;
			}

			// Now submit the job using condor_submit
			exec(`ssh mjhartke@${accessPoint} "condor_submit ${remotePath}"`, (error, stdout, stderr) => {
				if (error) {
					vscode.window.showErrorMessage("Failed to submit job: " + error.message);
					return;
				}
				if (stdout) {
					// submit file was successfully submitted
					vscode.window.showInformationMessage(stdout);
				}
				// check for existing tail process and kill it
				// exec(`kill -9 ${pid}`, (error, stdout, stderr) => {
				// 	if (stdout === "" || pid === undefined) {
				// 		console.log("killed tail process " + pid);
				// 		// start tail process
				// 		const tail = exec(`ssh mjhartke@${accessPoint} "tail -f /home/mjhartke/test.log" >> /Users/maxhartke/htc/src/test.log`);
				// 		console.log("started tail process " + tail.pid);
				// 		pid = tail?.pid;
				// 	} else if (error) {
				// 		console.log(error);
				// 		vscode.window.showErrorMessage("Failed to kill tail process: " + error.message);
				// 	}
				// });

				
				// Check for existing tail process and kill it
				// if (tailProcess) {
				// 	try {
				// 		exec(`ssh mjhartke@${accessPoint} "kill -9 ${tailProcess.pid}"`);
				// 		console.log("Killed tail process " + tailProcess.pid);
				// 	} catch (error) {
				// 		console.log("Failed to kill tail process: ", error);
				// 		vscode.window.showErrorMessage("Failed to kill tail process: " + error);
				// 	}
				// }

				// this approach seems to work fairly well right now - only thing I can think of is saving the pid 
				// and killing it eventually or even just killing all tail processes on extension deactivation
				// finally another random thought is to just have the log file passed in as an argument to this command

				// // Start a new tail process
				if(!submitted){
					submitted = true;
					tailProcess = exec(`ssh mjhartke@${accessPoint} "tail -f /home/mjhartke/test.log" >> /Users/maxhartke/htc/src/test.log`);
					console.log("Started tail process " + tailProcess.pid);
				}
				// tailProcess = exec(`ssh mjhartke@${accessPoint} "tail -f /home/mjhartke/test.log" >> /Users/maxhartke/htc/src/test.log`);
				// console.log("Started tail process " + tailProcess.pid);
			});
		});
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
