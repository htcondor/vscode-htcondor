    should_transfer_files = <YES | NO | IF_NEEDED >

The **should_transfer_files** setting is used to define if HTCondor
should transfer files to and from the remote machine where the job runs.
The file transfer mechanism is used to run jobs on machines which do not
have a shared file system with the submit machine.
**should_transfer_files** equal to *YES* will cause HTCondor to always
transfer files for the job. *NO* disables HTCondor's file transfer
mechanism. *IF_NEEDED* will not transfer files for the job if it is
matched with a resource in the same `FileSystemDomain` as the access
point (and therefore, on a machine with the same shared file system). If
the job is matched with a remote resource in a different
`FileSystemDomain`, HTCondor will transfer the necessary files.

For more information about this and other settings related to
transferring files, see the HTCondor User's manual section on the file
transfer mechanism.

Note that **should_transfer_files** is not supported for jobs submitted
to the grid universe.
