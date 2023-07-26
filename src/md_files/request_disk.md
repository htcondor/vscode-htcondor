    request_disk = <quantity>

The requested amount of disk space in KiB requested for this job. If not
specified, it will be set to the job ClassAd attribute `DiskUsage`. The
expression

<div>

<div>

    && (RequestDisk <= Target.Disk)

</div>

</div>

is appended to the **requirements** expression for the job.

For pools that enable dynamic *condor_startd* provisioning, a dynamic
slot will be created with at least this much disk space.

Characters may be appended to a numerical value to indicate units. `K`
or `KB` indicates KiB, 2^10^ numbers of bytes. `M` or `MB` indicates
MiB, 2^20^ numbers of bytes. `G` or `GB` indicates GiB, 2^30^ numbers of
bytes. `T` or `TB` indicates TiB, 2^40^ numbers of bytes.
