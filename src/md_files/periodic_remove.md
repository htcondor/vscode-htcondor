    periodic_remove = <ClassAd Boolean Expression>

This expression is checked periodically. If it becomes `True`, the job
is removed from the queue. If unspecified, the default value is `False`.

See the Examples section of this manual page for an example of a
**periodic_remove** expression.

`periodic_*` expressions take precedence over `on_exit_*` expressions,
and `*_hold` expressions take precedence over a `*_remove` expressions.
So, the `periodic_remove` expression takes precedent over the
`on_exit_remove` expression, if the two describe conflicting actions.

Only job ClassAd attributes will be defined for use by this ClassAd
expression. Note that, by default, this expression is only checked once
every 60 seconds. The period of these evaluations can be adjusted by
setting the `PERIODIC_EXPR_INTERVAL`, `MAX_PERIODIC_EXPR_INTERVAL`, and
`PERIODIC_EXPR_TIMESLICE` configuration macros.
