    job_machine_attrs = <attr1, attr2, …>

A comma and/or space separated list of machine attribute names that
should be recorded in the job ClassAd in addition to the ones specified
by the *condor_schedd* daemon's system configuration variable
`SYSTEM_JOB_MACHINE_ATTRS` . When there are multiple run attempts,
history of machine attributes from previous run attempts may be kept.
The number of run attempts to store may be extended beyond the
system-specified history length by using the submit file command
**job_machine_attrs_history_length** . A machine attribute named `X`
will be inserted into the job ClassAd as an attribute named
`MachineAttrX0`. The previous value of this attribute will be named
`MachineAttrX1`, the previous to that will be named `MachineAttrX2`, and
so on, up to the specified history length. A history of length 1 means
that only `MachineAttrX0` will be recorded. The value recorded in the
job ClassAd is the evaluation of the machine attribute in the context of
the job ClassAd when the *condor_schedd* daemon initiates the start up
of the job. If the evaluation results in an `Undefined` or `Error`
result, the value recorded in the job ad will be `Undefined` or `Error`,
respectively.
