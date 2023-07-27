    when_to_transfer_output = < ON_EXIT | ON_EXIT_OR_EVICT | ON_SUCCESS >

Setting `when_to_transfer_output` to `ON_EXIT` will cause HTCondor to
transfer the job's output files back to the submitting machine when the
job completes (exits on its own). If a job is evicted and started again,
the subsequent execution will start with only the executable and input
files in the scratch directory sandbox. If `transfer_output_files` is
not set, HTCondor considers all new files in the sandbox's top-level
directory to be the output; subdirectories and their contents will not
be transferred.

Setting `when_to_transfer_output` to `ON_EXIT_OR_EVICT` will cause
HTCondor to transfer the job's output files when the job completes
(exits on its own) and when the job is evicted. When the job is evicted,
HTCondor will transfer the output files to a temporary directory on the
submit node (determined by the `SPOOL` configuration variable). When the
job restarts, these files will be transferred instead of the input
files. If `transfer_output_files` is not set, HTCondor considers all
files in the sandbox's top-level directory to be the output;
subdirectories and their contents will not be transferred.

Setting `when_to_transfer_output` to `ON_SUCCESS` will cause HTCondor to
transfer the job's output files when the job completes successfully.
Success is defined by the `success_exit_code` command, which must be
set, even if the successful value is the default `0`. If
`transfer_output_files` is not set, HTCondor considers all new files in
the sandbox's top-level directory to be the output; subdirectories and
their contents will not be transferred.

In all three cases, the job will go on hold if `transfer_output_files`
specifies a file which does not exist at transfer time.
