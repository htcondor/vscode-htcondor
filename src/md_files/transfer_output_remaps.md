    transfer_output_remaps = < ” name = newname ; name2 = newname2 … “>

This specifies the name (and optionally path) to use when downloading
output files from the completed job. Normally, output files are
transferred back to the initial working directory with the same name
they had in the execution directory. This gives you the option to save
them with a different path or name. If you specify a relative path, the
final path will be relative to the job's initial working directory, and
HTCondor will create directories as necessary to transfer the file.

*name* describes an output file name produced by your job, and *newname*
describes the file name it should be downloaded to. Multiple remaps can
be specified by separating each with a semicolon. If you wish to remap
file names that contain equals signs or semicolons, these special
characters may be escaped with a backslash. You cannot specify
directories to be remapped.

Note that whether an output file is transferred is controlled by
**transfer_output_files**. Listing a file in **transfer_output_remaps**
is not sufficient to cause it to be transferred.
