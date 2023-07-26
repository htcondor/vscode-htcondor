    allowed_job_duration = <integer>

The longest time for which a job may continuously be in the running
state. Jobs which exceed this duration will go on hold. Exiting the
running state resets the job duration used by this command.

This command is intended to help minimize the time wasted by jobs which
may erroneously run forever.
