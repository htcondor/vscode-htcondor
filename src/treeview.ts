import path = require("path");
import * as fs from "fs";
import * as vscode from "vscode";

type JobOrEvent = Job | Event;

export class JobProvider implements vscode.TreeDataProvider<JobOrEvent> {
	constructor() {
		this.startWatching();
	}

	// maybe just watch log file if able to mount it
	startWatching(): void {
		fs.watch("/Users/maxhartke/htc/src/test.log", (event, filename) => {
			if (event === "change") {
				this.refresh();
			}
		});
	}

	private _onDidChangeTreeData: vscode.EventEmitter<JobOrEvent | undefined | void> = new vscode.EventEmitter<JobOrEvent | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<JobOrEvent | undefined | void> = this._onDidChangeTreeData.event;

	private _jobs: { [id: string]: Job } = {};

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: JobOrEvent): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}

	private getLogFileName(jobId: string): string {
		return "test.log";
	}

	public getJobs(): Job[] {
		this._jobs = {};
		let jobs: Job[] = [];
		let data: string;
		try {
			data = fs.readFileSync("/Users/maxhartke/htc/src/test.log", "utf8");
		} catch (err) {
			console.error(err);
			return [];
		}

		// process data here
		const logEntries = parseLog(data);
		// for each job in log file create a new Job object and add to array
		for (const entry of logEntries) {
			const jobId = entry.jobId;
			if (jobId in this._jobs) {
				// add event to existing job if its a state - need to refactor
				if (this.eventCodeToState(entry.eventCode) !== "not a state") {
					this._jobs[jobId].events.push(new Event(this.eventCodeToState(entry.eventCode), new Date(entry.timestamp)));
				}
			} else {
				// create new job
				const job = new Job(entry.jobId, [new Event(this.eventCodeToState(entry.eventCode), new Date(entry.timestamp))], new Date(entry.timestamp));
				this._jobs[jobId] = job;
			}
		}

		interface LogEntry {
			eventCode: string;
			jobId: string;
			timestamp: string;
		}

		function parseLog(data: string): LogEntry[] {
			const regex = /(\d{3}) \((\d+\.\d+\.\d+)\) ((?:\d{2}\/\d{2} \d{2}:\d{2}:\d{2})|(?:\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}))/g;
			const entries: LogEntry[] = [];
			let match;

			while ((match = regex.exec(data)) !== null) {
				const [, eventCode, jobId, dateString] = match;
				entries.push({ eventCode, jobId, timestamp: dateString });
			}

			return entries;
		}

		// convert dictionary to array of Jobs
		for (const jobId in this._jobs) {
			jobs.push(this._jobs[jobId]);
		}
		return jobs;
	}

	public eventCodeToState(eventCode: string): string {
		switch (eventCode) {
			case "000":
				return "Submitted";
			case "001":
				return "Executed";
			case "002":
				return "Executable error";
			case "003":
				return "Checkpointed";
			case "004":
				return "Evicted";
			case "005":
				return "Terminated";
			// image size - not a state
			case "006":
				return "not a state";
			case "007":
				return "Shadow exception";
			case "009":
				return "Aborted";
			case "010":
				return "Suspended";
			case "011":
				return "Unsuspended";
			case "012":
				return "Held";
			case "013":
				return "Released";
			case "014":
				return "Node execute";
			case "015":
				return "Node terminated";
			case "016":
				return "Post script terminated";
			case "021":
				return "Remote error";
			case "022":
				return "Job disconnected";
			case "023":
				return "Job reconnected";
			case "024":
				return "Job reconnect failed";
			case "025":
				return "Grid resource up";
			case "026":
				return "Grid resource down";
			case "027":
				return "Grid submit";
			case "028":
				return "Job ClassAd attribute values added to event log";
			case "029":
				return "Job status unknown";
			case "030":
				return "Job status known";
			case "031":
				return "Grid job stage in";
			case "032":
				return "Grid job stage out";
			case "033":
				return "Job ClassAd attribute update";
			case "034":
				return "DAGMan PRE_SKIP defined";
			case "035":
				return "Cluster submitted";
			case "036":
				return "Cluster removed";
			case "037":
				return "Factory paused";
			case "038":
				return "Factory resumed";
			case "039":
				return "No event could be returned";
			case "040":
				return "not a state";
			default:
				return "Unknown";
		}
	}

	getChildren(element?: JobOrEvent): Thenable<JobOrEvent[]> {
		if (element instanceof Job) {
			// If a Job is provided, return its states.
			return Promise.resolve(element.events);
		} else {
			// If no Job is provided (i.e., we're at the top level of the tree), return the list of jobs.
			return Promise.resolve(this.getJobs());
		}
	}
}

export class Job extends vscode.TreeItem {
	constructor(
		public readonly id: string,
		public events: Event[] = [],
		public startTime?: Date,
		public endTime?: Date,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.Collapsed
	) {
		super(id, collapsibleState);
		this.tooltip = `${this.id}`;
		this.events = events;
	}
	iconPath = {
		light: path.join(__filename, "..", "..", "src", "light", "job.svg"),
		dark: path.join(__filename, "..", "..", "src", "dark", "job.svg"),
	};
	contextValue = "Job";
}

export class Event extends vscode.TreeItem {
	constructor(
		public readonly state: string,
		public startTime?: Date,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.None
	) {
		super(state, collapsibleState);
		this.tooltip = `${this.state}`;
		this.description = startTime?.toLocaleString();
	}
	iconPath = {
		light: path.join(__filename, "..", "..", "src", "light", this.state + ".svg"),
		dark: path.join(__filename, "..", "..", "src", "dark", this.state + ".svg"),
	};
	contextValue = "Event";
}
