    max_transfer_output_mb = <ClassAd Integer Expression>

This integer expression specifies the maximum allowed total size in MiB
of the output files that are transferred for a job. This expression does
not apply to grid universe or files transferred via file transfer
plug-ins. The expression may refer to attributes of the job. The special
value -1 indicates no limit. If not set, the value set by configuration
variable `MAX_TRANSFER_OUTPUT_MB` is used. If the total size of the
job's output files to be transferred is larger than the limit, the job
will be placed on hold with a `HoldReasonCode` value of 33. The output
will be transferred up to the point when the limit is hit, so some files
may be fully transferred, some partially, and some not at all.
