// documentation for submit file keywords

export const submitDocumentation = [
	{
		name: "arguments",
		description: "List of arguments to be supplied to the executable as part of the command line.",
		example: "arguments = <argument_list>",
		html: true,
	},

	{
		name: "environment",
		description: "List of environment variables.",
		example: "environment = <parameter_list>",
		html: true,
	},
	{
		name: "error",
		description: "A path and file name used by HTCondor to capture any error messages the program would normally write to the screen (stderr).",
		example: "",
		html: true,
	},
	{
		name: "executable",
		description: "An optional path and a required file name of the executable file for this job cluster.",
		example: "",
		html: true,
	},
	{
		name: "batch_name",
		description: "Set the batch name for this submit. The batch name is displayed by condor_q -batch.",
		example: "",
		html: true,
	},
	{
		name: "getenv",
		description:
			"If getenv is set to True, then condor_submit will copy all of the user's current shell environment variables at the time of job submission into the job ClassAd.",
		example: "",
		html: true,
	},
	{
		name: "input",
		description:
			"HTCondor assumes that its jobs are long-running, and that the user will not wait at the terminal for their completion. Because of this, the standard files which normally access the terminal, (stdin, stdout, and stderr), must refer to files.",
		example: "",
		html: true,
	},
	{
		name: "log",
		description:
			"Use log to specify a file name where HTCondor will write a log file of what is happening with this job cluster, called a job event log.",
		example: "",
		html: true,
	},
	{
		name: "notification",
		description: "Owners of HTCondor jobs are notified by e-mail when certain events occur.",
		example: "",
		html: true,
	},
	{
		name: "notify_user",
		description: "Used to specify the e-mail address to use when HTCondor sends e-mail about a job.",
		example: "",
		html: true,
	},
	{
		name: "output",
		description: "The output file captures any information the program would ordinarily write to the screen (stdout).",
		example: "",
		html: true,
	},
	{
		name: "priority",
		description:
			"An HTCondor job priority can be any integer, with 0 being the default. Jobs with higher numerical priority will run before jobs with lower numerical priority.",
		example: "",
		html: true,
	},
	{
		name: "queue",
		description: "Each submit description file describes one or more clusters of jobs to be placed in the HTCondor execution pool.",
		example: "",
		html: true,
	},
];
