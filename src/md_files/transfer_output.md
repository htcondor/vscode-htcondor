    transfer_output = <True | False>

For jobs submitted to the grid universe only. If `True`, then the output
(from `stdout`) from the job is transferred from the remote machine back
to the access point. The name of the file after transfer is given by the
**output** command. If `False`, no transfer takes place (from the remote
machine to access point), and the name of the file is given by the
**output** command. The default value is `True`.

For transferring files other than `stdout`, see
**transfer_output_files** .
