    noop_job = <ClassAd Boolean Expression>

When this boolean expression is `True`, the job is immediately removed
from the queue, and HTCondor makes no attempt at running the job. The
log file for the job will show a job submitted event and a job
terminated event, along with an exit code of 0, unless the user
specifies a different signal or exit code.
