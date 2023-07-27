    input = <pathname>

HTCondor assumes that its jobs are long-running, and that the user will
not wait at the terminal for their completion. Because of this, the
standard files which normally access the terminal, (`stdin`, `stdout`,
and `stderr`), must refer to files. Thus, the file name specified with
**input** should contain any keyboard input the program requires (that
is, this file becomes `stdin`). A path is given with respect to the file
system of the machine on which the job is submitted. The file is
transferred before execution to the remote scratch directory of the
machine where the job is executed. If not specified, the default value
of `/dev/null` is used for submission to a Unix machine. If not
specified, input is ignored for submission to a Windows machine.

Note that this command does not refer to the command-line arguments of
the program. The command-line arguments are specified by the
**arguments** command.
