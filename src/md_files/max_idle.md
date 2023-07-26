    max_idle = <limit>

Submit jobs as a late materialization factory and instruct the
*condor_schedd* to keep the given number of non-running jobs
materialized. Use this option to reduce the load on the *condor_schedd*
when submitting a large number of jobs. The limit may be an expression
but it must evaluate to a constant at submit time. Jobs in the Held
state are considered to be Idle for this limit. A limit of less than 1
will prevent jobs from being materialized although the factory will
still be submitted to the *condor_schedd*. (see [Submitting Lots of
Jobs](https://htcondor.readthedocs.io/en/latest/users-manual/submitting-a-job.html#submitting-lots-of-jobs) for
more details).
