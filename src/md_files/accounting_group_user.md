    accounting_group_user = <accounting-group-user-name>

Sets the name associated with this job to be used for resource usage
accounting purposes, such as computation of fair-share priority and
reporting via `condor_userprio`. If not set, defaults to the value of
the job ClassAd attribute `User`. This value is advertised in the job
ClassAd as `AcctGroupUser`.
