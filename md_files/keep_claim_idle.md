    keep_claim_idle = <integer>

An integer number of seconds that a job requests the *condor_schedd* to
wait before releasing its claim after the job exits or after the job is
removed.

The process by which the *condor_schedd* claims a *condor_startd* is
somewhat time-consuming. To amortize this cost, the *condor_schedd*
tries to reuse claims to run subsequent jobs, after a job using a claim
is done. However, it can only do this if there is an idle job in the
queue at the moment the previous job completes. Sometimes, and
especially for the node jobs when using DAGMan, there is a subsequent
job about to be submitted, but it has not yet arrived in the queue when
the previous job completes. As a result, the *condor_schedd* releases
the claim, and the next job must wait an entire negotiation cycle to
start. When this submit command is defined with a non-negative integer,
when the job exits, the *condor_schedd* tries as usual to reuse the
claim. If it cannot, instead of releasing the claim, the *condor_schedd*
keeps the claim until either the number of seconds given as a parameter,
or a new job which matches that claim arrives, whichever comes first.
The *condor_startd* in question will remain in the Claimed/Idle state,
and the original job will be "charged" (in terms of priority) for the
time in this state.
