    kill_sig = <signal-number>

When HTCondor needs to kick a job off of a machine, it will send the job
the signal specified by **signal-number** . **signal-number** needs to
be an integer which represents a valid signal on the execution machine.
The default value is SIGTERM, which is the standard way to terminate a
program in Unix.
