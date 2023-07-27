    transfer_checkpoint_files = < file1,file2,file3… >

If present, this command defines the list of files and/or directories
which constitute the job's checkpoint. When the job successfully
checkpoints -- see `checkpoint_exit_code` -- these files will be
transferred to the submit node's spool.

If this command is absent, the output is transferred instead.

If no files or directories are specified, nothing will be transferred.
This is generally not useful.

The list is interpreted like `transfer_output_files`, but there is no
corresponding `remaps` command.
