    transfer_error = <True | False>

For jobs submitted to the grid universe only. If `True`, then the error
output (from `stderr`) from the job is transferred from the remote
machine back to the access point. The name of the file after transfer is
given by the **error** command. If `False`, no transfer takes place
(from the remote machine to access point), and the name of the file is
given by the **error** command. The default value is `True`.
