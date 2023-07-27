    job_lease_duration = <number-of-seconds>

For vanilla, parallel, VM, and java universe jobs only, the duration in
seconds of a job lease. The default value is 2,400, or forty minutes. If
a job lease is not desired, the value can be explicitly set to 0 to
disable the job lease semantics. The value can also be a ClassAd
expression that evaluates to an integer. The HTCondor User's manual
section on Special Environment Considerations has further details.
