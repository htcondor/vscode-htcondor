    periodic_release = <ClassAd Boolean Expression>

This expression is checked periodically when the job is in the Held
state. If the expression becomes `True`, the job will be released. If
the job was held via *condor_hold* (i.e. `HoldReasonCode` is `1`), then
this expression is ignored.

Only job ClassAd attributes will be defined for use by this ClassAd
expression. Note that, by default, this expression is only checked once
every 60 seconds. The period of these evaluations can be adjusted by
setting the `PERIODIC_EXPR_INTERVAL`, `MAX_PERIODIC_EXPR_INTERVAL`, and
`PERIODIC_EXPR_TIMESLICE` configuration macros.
