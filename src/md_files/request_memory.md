    request_memory = <quantity>

The required amount of memory in MiB that this job needs to avoid
excessive swapping. If not specified and the submit command
**vm_memory** is specified, then the value specified for **vm_memory**
defines **request_memory** . If neither **request_memory** nor
**vm_memory** is specified, the value is set by the configuration
variable `JOB_DEFAULT_REQUESTMEMORY` . The actual amount of memory used
by a job is represented by the job ClassAd attribute `MemoryUsage`.

For pools that enable dynamic *condor_startd* provisioning, a dynamic
slot will be created with at least this much RAM.

The expression

<div>

<div>

    && (RequestMemory <= Target.Memory)

</div>

</div>

is appended to the **requirements** expression for the job.

Characters may be appended to a numerical value to indicate units. `K`
or `KB` indicates KiB, 2^10^ numbers of bytes. `M` or `MB` indicates
MiB, 2^20^ numbers of bytes. `G` or `GB` indicates GiB, 2^30^ numbers of
bytes. `T` or `TB` indicates TiB, 2^40^ numbers of bytes.
