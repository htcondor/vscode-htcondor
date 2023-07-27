    erase_output_and_error_on_restart

If false, and `when_to_transfer_output` is `ON_EXIT_OR_EVICT`, HTCondor
will append to the output and error logs rather than erase (truncate)
them when the job restarts.
