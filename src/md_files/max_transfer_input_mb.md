    max_transfer_input_mb = <ClassAd Integer Expression>

This integer expression specifies the maximum allowed total size in MiB
of the input files that are transferred for a job. This expression does
not apply to grid universe or files transferred via file transfer
plug-ins. The expression may refer to attributes of the job. The special
value -1 indicates no limit. If not defined, the value set by
configuration variable `MAX_TRANSFER_INPUT_MB` is used. If the observed
size of all input files at submit time is larger than the limit, the job
will be immediately placed on hold with a `HoldReasonCode` value of 32.
If the job passes this initial test, but the size of the input files
increases or the limit decreases so that the limit is violated, the job
will be placed on hold at the time when the file transfer is attempted.
