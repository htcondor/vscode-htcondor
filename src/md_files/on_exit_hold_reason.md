    on_exit_hold_reason = <ClassAd String Expression>

When the job is placed on hold due to the **on_exit_hold** expression
becoming `True`, this expression is evaluated to set the value of
`HoldReason` in the job ClassAd. If this expression is `UNDEFINED` or
produces an empty or invalid string, a default description is used.
