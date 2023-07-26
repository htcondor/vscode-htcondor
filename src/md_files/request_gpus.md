    request_gpus = <num-gpus>

A requested number of GPUs. If not specified, no GPUs will be requested.
If specified and `require_gpus` is not also specified, the expression

<div>

<div>

    && (Target.GPUs >= RequestGPUs)

</div>

</div>

is appended to the **requirements** expression for the job.

For pools that enable dynamic *condor_startd* provisioning, specifies
the minimum number of GPUs requested for this job, resulting in a
dynamic slot being created with this many GPUs.
