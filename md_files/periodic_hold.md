    periodic_hold = <ClassAd Boolean Expression>

This expression is checked periodically when the job is not in the Held
state. If it becomes `True`, the job will be placed on hold. If
unspecified, the default value is `False`.

`periodic_*` expressions take precedence over `on_exit_*` expressions,
and `*_hold` expressions take precedence over a `*_remove` expressions.

Only job ClassAd attributes will be defined for use by this ClassAd
expression. Note that, by default, this expression is only checked once
every 60 seconds. The period of these evaluations can be adjusted by
setting the `PERIODIC_EXPR_INTERVAL`, `MAX_PERIODIC_EXPR_INTERVAL`, and
`PERIODIC_EXPR_TIMESLICE` configuration macros.
