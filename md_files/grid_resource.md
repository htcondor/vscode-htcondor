    grid_resource = <grid-type-string> <grid-specific-parameter-list>

For each **grid-type-string** value, there are further type-specific
values that must specified. This submit description file command allows
each to be given in a space-separated list. Allowable
**grid-type-string** values are **arc**, **azure**, **batch**,
**condor**, **ec2**, and **gce**. The HTCondor manual chapter on Grid
Computing details the variety of grid types.

For a **grid-type-string** of **batch**, the single parameter is the
name of the local batch system, and will be one of `pbs`, `lsf`,
`slurm`, or `sge`.

For a **grid-type-string** of **condor**, the first parameter is the
name of the remote *condor_schedd* daemon. The second parameter is the
name of the pool to which the remote *condor_schedd* daemon belongs.

For a **grid-type-string** of **ec2**, one additional parameter
specifies the EC2 URL.

For a **grid-type-string** of **arc**, the single parameter is the name
of the ARC resource to be used.
