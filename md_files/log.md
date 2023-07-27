    log = <pathname>

Use **log** to specify a file name where HTCondor will write a log file
of what is happening with this job cluster, called a job event log. For
example, HTCondor will place a log entry into this file when and where
the job begins running, when the job produces a checkpoint, or moves
(migrates) to another machine, and when the job completes. Most users
find specifying a **log** file to be handy; its use is recommended. If
no **log** entry is specified, HTCondor does not create a log for this
cluster. If a relative path is specified, it is relative to the current
working directory as the job is submitted or the directory specified by
submit command **initialdir** on the access point.
