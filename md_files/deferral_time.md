    deferral_time = <ClassAd Integer Expression>

Allows a job to specify the time at which its execution is to begin,
instead of beginning execution as soon as it arrives at the execution
machine. The deferral time is an expression that evaluates to a Unix
Epoch timestamp (the number of seconds elapsed since 00:00:00 on January
1, 1970, Coordinated Universal Time). Deferral time is evaluated with
respect to the execution machine. This option delays the start of
execution, but not the matching and claiming of a machine for the job.
If the job is not available and ready to begin execution at the deferral
time, it has missed its deferral time. A job that misses its deferral
time will be put on hold in the queue.

The HTCondor User's manual section on Time Scheduling for Job Execution
has further details.

Due to implementation details, a deferral time may not be used for
scheduler universe jobs.
