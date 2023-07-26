    stream_input = <True | False>

If `True`, then `stdin` is streamed from the machine on which the job
was submitted. The default value is `False`. The command is only
relevant for jobs submitted to the vanilla or java universes, and it is
ignored by the grid universe. This command must be used in conjunction
with **input** , otherwise `stdin` will be `/dev/null` on Unix machines
and ignored on Windows machines.
