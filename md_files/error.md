    error = <pathname>

A path and file name used by HTCondor to capture any error messages the
program would normally write to the screen (that is, this file becomes
`stderr`). A path is given with respect to the file system of the
machine on which the job is submitted. The file is written (by the job)
in the remote scratch directory of the machine where the job is
executed. When the job exits, the resulting file is transferred back to
the machine where the job was submitted, and the path is utilized for
file placement. If you specify a relative path, the final path will be
relative to the job's initial working directory, and HTCondor will
create directories as necessary to transfer the file. If not specified,
the default value of `/dev/null` is used for submission to a Unix
machine. If not specified, error messages are ignored for submission to
a Windows machine. More than one job should not use the same error file,
since this will cause one job to overwrite the errors of another. If
HTCondor detects that the error and output files for a job are the same,
it will run the job such that the output and error data is merged.
