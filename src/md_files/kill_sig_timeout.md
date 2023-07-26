    kill_sig_timeout = <seconds>

This submit command should no longer be used as of HTCondor version
7.7.3; use **job_max_vacate_time** instead. If **job_max_vacate_time**
is not defined, this defines the number of seconds that HTCondor should
wait following the sending of the kill signal defined by **kill_sig**
and forcibly killing the job. The actual amount of time between sending
the signal and forcibly killing the job is the smallest of this value
and the configuration variable `KILLING_TIMEOUT` , as defined on the
execute machine.
