    transfer_input = <True | False>

For jobs submitted to the grid universe only. If `True`, then the job
input (`stdin`) is transferred from the machine where the job was
submitted to the remote machine. The name of the file that is
transferred is given by the **input** command. If `False`, then the
job's input is taken from a pre-staged file on the remote machine, and
the name of the file is given by the **input** command. The default
value is `True`.

For transferring files other than `stdin`, see **transfer_input_files**
.
