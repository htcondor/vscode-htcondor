    require_gpus = <constraint-expression>

A constraint on the properties of GPUs when used with a non-zero
`request_gpus` value. If not specified, no constraint on GPUs will be
added to the job. If specified and `request_gpus` is non-zero, the
expression

<div>

<div>

    && (countMatches(MY.RequireGPUs, TARGET.AvailableGPUs) >= RequestGPUs)

</div>

</div>

is appended to the **requirements** expression for the job. This
expression cannot be evaluated by HTCondor prior to version 9.8.0. A
warning to this will effect will be printed when *condor_submit* detects
this condition.

For pools that enable dynamic *condor_startd* provisioning and are at
least version 9.8.0, the constraint will be tested against the
properties of AvailableGPUs and only those that match will be assigned
to the dynamic slot.
