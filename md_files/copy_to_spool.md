    copy_to_spool = <True | False>

If **copy_to_spool** is `True`, then *condor_submit* copies the
executable to the local spool directory before running it on a remote
host. As copying can be quite time consuming and unnecessary, the
default value is `False` for all job universes. When `False`,
*condor_submit* does not copy the executable to a local spool directory.
