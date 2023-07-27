    success_exit_code = <integer>

The exit code that is considered successful for this job. Defaults to 0
if not defined.

**Note**: non-zero values of success_exit_code should generally not be
used for DAG node jobs, unless `when_to_transfer_output` is set to
`ON_SUCCESS` in order to avoid failed jobs going on hold.

At the present time, *condor_dagman* does not take into account the
value of **success_exit_code**. This means that, if
**success_exit_code** is set to a non-zero value, *condor_dagman* will
consider the job failed when it actually succeeds. For single-proc DAG
node jobs, this can be overcome by using a POST script that takes into
account the value of **success_exit_code** (although this is not
recommended). For multi-proc DAG node jobs, there is currently no way to
overcome this limitation.
