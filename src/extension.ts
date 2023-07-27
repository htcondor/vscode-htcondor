// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

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
	context.subscriptions.push(vscode.languages.registerHoverProvider("htcondor", new DocHoverProvider()));
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider("htcondor", new DocCompletionItemProvider(), " "));
}

// This method is called when your extension is deactivated
export function deactivate() {}
