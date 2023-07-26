    executable = <pathname>

An optional path and a required file name of the executable file for
this job cluster. Only one **executable** command within a submit
description file is guaranteed to work properly. More than one often
works.

If no path or a relative path is used, then the executable file is
presumed to be relative to the current working directory of the user as
the *condor_submit* command is issued.
