    output = <pathname>

The **output** file captures any information the program would
ordinarily write to the screen (that is, this file becomes `stdout`). A
path is given with respect to the file system of the machine on which
the job is submitted. The file is written (by the job) in the remote
scratch directory of the machine where the job is executed. When the job
exits, the resulting file is transferred back to the machine where the
job was submitted, and the path is utilized for file placement. If you
specify a relative path, the final path will be relative to the job's
initial working directory, and HTCondor will create directories as
necessary to transfer the file. If not specified, the default value of
`/dev/null` is used for submission to a Unix machine. If not specified,
output is ignored for submission to a Windows machine. Multiple jobs
should not use the same output file, since this will cause one job to
overwrite the output of another. If HTCondor detects that the error and
output files for a job are the same, it will run the job such that the
output and error data is merged.

Note that if a program explicitly opens and writes to a file, that file
should not be specified as the **output** file.
