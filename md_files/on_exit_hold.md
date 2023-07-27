    on_exit_hold = <ClassAd Boolean Expression>

The ClassAd expression is checked when the job exits, and if `True`,
places the job into the Hold state. If `False` (the default value when
not defined), then nothing happens and the `on_exit_remove` expression
is checked to determine if that needs to be applied.

For example: Suppose a job is known to run for a minimum of an hour. If
the job exits after less than an hour, the job should be placed on hold
and an e-mail notification sent, instead of being allowed to leave the
queue.

<div>

<div>

    on_exit_hold = (time() - JobStartDate) < (60 * $(MINUTE))

</div>

</div>

This expression places the job on hold if it exits for any reason before
running for an hour. An e-mail will be sent to the user explaining that
the job was placed on hold because this expression became `True`.

`periodic_*` expressions take precedence over `on_exit_*` expressions,
and `*_hold` expressions take precedence over a `*_remove` expressions.

Only job ClassAd attributes will be defined for use by this ClassAd
expression. This expression is available for the vanilla, java,
parallel, grid, local and scheduler universes.
