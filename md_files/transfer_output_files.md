    transfer_output_files = < file1,file2,file… >

This command forms an explicit list of output files and directories to
be transferred back from the temporary working directory on the execute
machine to the access point. If there are multiple files, they must be
delimited with commas. Setting **transfer_output_files** to the empty
string ("") means that no files are to be transferred.

For HTCondor-C jobs and all other non-grid universe jobs, if
**transfer_output_files** is not specified, HTCondor will automatically
transfer back all files in the job's temporary working directory which
have been modified or created by the job. Subdirectories are not scanned
for output, so if output from subdirectories is desired, the output list
must be explicitly specified. For grid universe jobs other than
HTCondor-C, desired output files must also be explicitly listed. Another
reason to explicitly list output files is for a job that creates many
files, and the user wants only a subset transferred back.

For grid universe jobs other than with grid type **condor**, to have
files other than standard output and standard error transferred from the
execute machine back to the access point, do use
**transfer_output_files**, listing all files to be transferred. These
files are found on the execute machine in the working directory of the
job.

When a path to an output file or directory is specified, it specifies
the path to the file on the execute side. As a destination on the submit
side, the file is placed in the job's initial working directory, and it
is named using the base name of the original path. For example,
`path/to/output_file` becomes `output_file` in the job's initial working
directory. The name and path of the file that is written on the submit
side may be modified by using **transfer_output_remaps** . Note that
this remap function only works with files but not with directories.

When a directory is specified, the behavior depends on whether there is
a trailing path separator character. When a directory is specified with
a trailing path separator, it is as if each of the items within the
directory were listed in the transfer list. Therefore, the contents are
transferred, but the directory itself is not. When there is no trailing
path separator, the directory itself is transferred with all of its
contents inside it. On platforms such as Windows where the path
separator is not a forward slash (/), a trailing forward slash is
treated as equivalent to a trailing path separator. An example of an
input directory specified with a trailing forward slash is
`input_data/`.

For grid universe jobs other than HTCondor-C, the transfer of
directories is not currently supported.

Symbolic links to files are transferred as the files they point to.
Transfer of symbolic links to directories is not currently supported.
