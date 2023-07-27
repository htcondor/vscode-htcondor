    on_exit_remove = <ClassAd Boolean Expression>

The ClassAd expression is checked when the job exits, and if `True` (the
default value when undefined), then it allows the job to leave the queue
normally. If `False`, then the job is placed back into the Idle state.
If the user job runs under the vanilla universe, then the job restarts
from the beginning.

For example, suppose a job occasionally segfaults, but chances are that
the job will finish successfully if the job is run again with the same
data. The **on_exit_remove** expression can cause the job to run again
with the following command. Assume that the signal identifier for the
segmentation fault is 11 on the platform where the job will be running.

<div>

<div>

    on_exit_remove = (ExitBySignal == False) || (ExitSignal != 11)

</div>

</div>

This expression lets the job leave the queue if the job was not killed
by a signal or if it was killed by a signal other than 11, representing
segmentation fault in this example. So, if the exited due to signal 11,
it will stay in the job queue. In any other case of the job exiting, the
job will leave the queue as it normally would have done.

As another example, if the job should only leave the queue if it exited
on its own with status 0, this **on_exit_remove** expression works well:

<div>

<div>

    on_exit_remove = (ExitBySignal == False) && (ExitCode == 0)

</div>

</div>

If the job was killed by a signal or exited with a non-zero exit status,
HTCondor would leave the job in the queue to run again.

`periodic_*` expressions take precedence over `on_exit_*` expressions,
and `*_hold` expressions take precedence over a `*_remove` expressions.

Only job ClassAd attributes will be defined for use by this ClassAd
expression.
