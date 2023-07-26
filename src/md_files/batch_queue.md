    batch_queue = <queuename>

Used for **batch** grid universe jobs. Specifies the name of the
PBS/LSF/SGE/SLURM job queue into which the job should be submitted. If
not specified, the default queue is used. For a multi-cluster SLURM
configuration, which cluster to use can be specified by supplying the
name after an `@` symbol. For example, to submit a job to the `debug`
queue on cluster `foo`, you would use the value `debug@foo`.
