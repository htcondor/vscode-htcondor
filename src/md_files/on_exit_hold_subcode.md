    on_exit_hold_subcode = <ClassAd Integer Expression>

When the job is placed on hold due to the **on_exit_hold** expression
becoming `True`, this expression is evaluated to set the value of
`HoldReasonSubCode` in the job ClassAd. The default subcode is 0. The
`HoldReasonCode` will be set to 3, which indicates that the job went on
hold due to a job policy expression.
