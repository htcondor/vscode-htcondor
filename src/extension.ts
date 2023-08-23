// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import TelemetryReporter from '@vscode/extension-telemetry';
import { report } from "process";

// the application insights key (also known as instrumentation key)
const key = '7958b5c6-25cc-4797-ac0b-c9a42a037190';

// telemetry reporter
let reporter: TelemetryReporter;
class DocHoverProvider implements vscode.HoverProvider {
	provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Hover> {
		return new Promise<vscode.Hover | undefined>((resolve) => {
			let wordRange = document.getWordRangeAtPosition(position);
			let keyword = document.getText(wordRange);

			const markdownFilePath = path.join(__dirname, "../md_files", keyword + ".md");
			if (fs.existsSync(markdownFilePath)) {
				try {
					let htmlContent = fs.readFileSync(markdownFilePath, "utf8");
					let markdown = new vscode.MarkdownString(htmlContent, true);
					markdown.supportHtml = true;

					reporter.sendTelemetryEvent('hover', { 'keyword': keyword });

					resolve(new vscode.Hover(markdown));
				} catch (error) {
					console.error(`Error while processing markdown file for keyword: ${keyword}`, error);
					resolve(undefined);  // Resolve as undefined on error
				}
			} else {
				// console.log(`No markdown file found for keyword: ${keyword}`);
				resolve(undefined);  // Resolve as undefined if no markdown file is found
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
			// Check if line matches the desired format
			const line = document.lineAt(position).text;
			const lineUntilCursor = line.substring(0, position.character);
			if (/^\s*\w+\s*$/.test(lineUntilCursor)) {
				fs.readdirSync(path.join(__dirname, "../md_files")).forEach((file) => {
					let command = new vscode.CompletionItem(file.replace(".md", ""), vscode.CompletionItemKind.Keyword);
					commands.push(command);
					return resolve(commands);
				});
			}
			// Don't provide any completions otherwise
			return [];
		});
	}
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	reporter = new TelemetryReporter(key);
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "htc" is now active!');
	context.subscriptions.push(vscode.languages.registerHoverProvider("htcondor", new DocHoverProvider()));
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider("htcondor", new DocCompletionItemProvider(), " "));
	context.subscriptions.push(reporter);
}

// This method is called when your extension is deactivated
export function deactivate() { }
