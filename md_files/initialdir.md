    initialdir = <directory-path>

Used to give jobs a directory with respect to file input and output.
Also provides a directory (on the machine from which the job is
submitted) for the job event log, when a full path is not specified.

For vanilla universe jobs where there is a shared file system, it is the
current working directory on the machine where the job is executed.

For vanilla or grid universe jobs where file transfer mechanisms are
utilized (there is not a shared file system), it is the directory on the
machine from which the job is submitted where the input files come from,
and where the job's output files go to.

For scheduler universe jobs, it is the directory on the machine from
which the job is submitted where the job runs; the current working
directory for file input and output with respect to relative path names.

Note that the path to the executable is not relative to **initialdir** ;
if it is a relative path, it is relative to the directory in which the
*condor_submit* command is run.
