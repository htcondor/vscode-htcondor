    max_materialize = <limit>

Submit jobs as a late materialization factory and instruct the
*condor_schedd* to keep the given number of jobs materialized. Use this
option to reduce the load on the *condor_schedd* when submitting a large
number of jobs. The limit can be an expression but it must evaluate to a
constant at submit time. A limit less than 1 will be treated as
unlimited. The *condor_schedd* can be configured to have a
materialization limit as well, the lower of the two limits will be used.
(see [Submitting Lots of
Jobs](https://htcondor.readthedocs.io/en/latest/users-manual/submitting-a-job.html#submitting-lots-of-jobs) for
more details).
