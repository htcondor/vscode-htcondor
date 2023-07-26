    manifest = <True | False>

For vanilla and Docker -universe jobs (and others that use the shadow),
specifies if HTCondor (the starter) should produce a "manifest", which
is directory containing three files: the list of files and directories
at the top level of the sandbox when file transfer in completes (`in`),
the same when file transfer out begins (`out`), and a dump of the
environment set for the job (`env`).

This feature is not presently available for Windows.
