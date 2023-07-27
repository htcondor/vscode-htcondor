    stream_output = <True | False>

If `True`, then `stdout` is streamed back to the machine from which the
job was submitted. If `False`, `stdout` is stored locally and
transferred back when the job completes. This command is ignored if the
job ClassAd attribute `TransferOut` is `False`. The default value is
`False`. This command must be used in conjunction with **output** ,
otherwise `stdout` will sent to `/dev/null` on Unix machines and ignored
on Windows machines.
