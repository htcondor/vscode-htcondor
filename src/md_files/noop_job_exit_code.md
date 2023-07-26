    noop_job_exit_code = <return value>

When **noop_job** is in the submit description file and evaluates to
`True`, this command allows the job to specify the return value as shown
in the job's log file job terminated event. If not specified, the job
will show as having terminated with status 0. This overrides any value
specified with **noop_job_exit_signal** .
