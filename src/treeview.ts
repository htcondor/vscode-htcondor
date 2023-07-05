import path = require("path");
import * as fs from "fs";
import * as vscode from "vscode";

type JobOrEvent = Job | Event;

export class JobProvider implements vscode.TreeDataProvider<JobOrEvent> {
	// unsure if this should go here
	static watchJob(job: any): void {
		// You can dump the condor submit property for your new job
		// console.dir(job.props);

		// Job.id contains cluster/proc ids
		console.log("Job ID: " + job.id);

		// You can *watch* job log
		job.onevent(function (event: any) {
			switch (event.MyType) {
				// Normal status type events (just display content)
				case "SubmitEvent":
					console.log(event.MyType);
				case "ExecuteEvent":
				case "JobImageSizeEvent":
					console.log(event.MyType);
					break;

				// Critical events
				case "ShadowExceptionEvent":
					console.log(event.MyType);
					console.dir(event);

					// I now stop the watcher (ends this submission)
					job.unwatch();
					break;

				// Job ended normally
				case "JobTerminatedEvent":
					console.log(event.MyType);
					console.dir(event.EventTime);

					// Do something based on the ReturnValue (resubmit, submit different job, etc..)
					console.log("return value:" + event.ReturnValue);

					// If you submitted queue != 1, then you can look for Event.Proc to get the Process ID (0, 1, etc..)

					break;

				default:
					console.log(event.MyType);
					console.log("unknown event type.. ignoring for now");
			}
		});
	}
	private _onDidChangeTreeData: vscode.EventEmitter<Job | undefined | null | void> = new vscode.EventEmitter<Job | undefined | null | void>();
	readonly onDidChangeTreeData: vscode.Event<Job | undefined | null | void> = this._onDidChangeTreeData.event;

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: JobOrEvent): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}

	private getLogFileName(jobId: string): string {
		return "test.log";
	}

	private _jobs: { [id: string]: Job } = {};

	private getJobs(): Job[] {
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
				// add event to existing job
				this._jobs[jobId].events.push(new Event(this.eventCodeToState(entry.eventCode)));
			} else {
				// create new job
				const job = new Job(entry.jobId, [new Event(this.eventCodeToState(entry.eventCode))], new Date(entry.timestamp));
				this._jobs[jobId] = job;
			}
		}

		interface LogEntry {
			eventCode: string;
			jobId: string;
			timestamp: string;
		}

		function parseLog(data: string): LogEntry[] {
			const regex = /(\d{3}) \((\d+\.\d+\.\d+)\) (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/g;
			const entries: LogEntry[] = [];
			let match;

			while ((match = regex.exec(data)) !== null) {
				const [, eventCode, jobId, timestamp] = match;
				entries.push({ eventCode, jobId, timestamp });
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
				return "Executed";
			case "005":
				return "Terminated";
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
		public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.None
	) {
		super(state, collapsibleState);
		this.tooltip = `${this.state}`;
		this.description = new Date().toLocaleString();
	}
	iconPath = {
		light: path.join(__filename, "..", "..", "src", "light", this.state + ".svg"),
		dark: path.join(__filename, "..", "..", "src", "dark", this.state + ".svg"),
	};
	contextValue = "Event";
}
