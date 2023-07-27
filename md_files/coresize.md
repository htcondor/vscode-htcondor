    coresize = <size>

Should the user's program abort and produce a core file, **coresize**
specifies the maximum size in bytes of the core file which the user
wishes to keep. If **coresize** is not specified in the command file,
the system's user resource limit `coredumpsize` is used (note that
`coredumpsize` is not an HTCondor parameter - it is an operating system
parameter that can be viewed with the *limit* or *ulimit* command on
Unix and in the Registry on Windows). A value of -1 results in no limits
being applied to the core file size. If HTCondor is running as root, a
**coresize** setting greater than the system `coredumpsize` limit will
override the system setting; if HTCondor is not running as root, the
system `coredumpsize` limit will override **coresize**.
