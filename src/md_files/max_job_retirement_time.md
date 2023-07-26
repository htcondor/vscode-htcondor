    max_job_retirement_time = <integer expression>

An integer-valued expression (in seconds) that does nothing unless the
machine that runs the job has been configured to provide retirement
time. Retirement time is a grace period given to a job to finish when a
resource claim is about to be preempted. The default behavior in many
cases is to take as much retirement time as the machine offers, so this
command will rarely appear in a submit description file.

When a resource claim is to be preempted, this expression in the submit
file specifies the maximum run time of the job (in seconds, since the
job started). This expression has no effect, if it is greater than the
maximum retirement time provided by the machine policy. If the resource
claim is not preempted, this expression and the machine retirement
policy are irrelevant. If the resource claim is preempted the job will
be allowed to run until the retirement time expires, at which point it
is hard-killed. The job will be soft-killed when it is getting close to
the end of retirement in order to give it time to gracefully shut down.
The amount of lead-time for soft-killing is determined by the maximum
vacating time granted to the job.

Any jobs running with **nice_user** priority have a default
**max_job_retirement_time** of 0, so no retirement time is utilized by
default. In all other cases, no default value is provided, so the
maximum amount of retirement time is utilized by default.

Setting this expression does not affect the job's resource requirements
or preferences. For a job to only run on a machine with a minimum
`MaxJobRetirementTime`, or to preferentially run on such machines,
explicitly specify this in the requirements and/or rank expressions.
