    stream_error = <True | False>

If `True`, then `stderr` is streamed back to the machine from which the
job was submitted. If `False`, `stderr` is stored locally and
transferred back when the job completes. This command is ignored if the
job ClassAd attribute `TransferErr` is `False`. The default value is
`False`. This command must be used in conjunction with **error** ,
otherwise `stderr` will sent to `/dev/null` on Unix machines and ignored
on Windows machines.
