    request_cpus = <num-cpus>

A requested number of CPUs (cores). If not specified, the number
requested will be 1. If specified, the expression

<div>

<div>

    && (RequestCpus <= Target.Cpus)

</div>

</div>

is appended to the **requirements** expression for the job.

For pools that enable dynamic *condor_startd* provisioning, specifies
the minimum number of CPUs requested for this job, resulting in a
dynamic slot being created with this many cores.
