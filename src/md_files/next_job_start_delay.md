    next_job_start_delay = <ClassAd Boolean Expression>

This expression specifies the number of seconds to delay after starting
up this job before the next job is started. The maximum allowed delay is
specified by the HTCondor configuration variable
`MAX_NEXT_JOB_START_DELAY` , which defaults to 10 minutes. This command
does not apply to **scheduler** or **local** universe jobs.

This command has been historically used to implement a form of job start
throttling from the job submitter's perspective. It was effective for
the case of multiple job submission where the transfer of extremely
large input data sets to the execute machine caused machine performance
to suffer. This command is no longer useful, as throttling should be
accomplished through configuration of the *condor_schedd* daemon.
