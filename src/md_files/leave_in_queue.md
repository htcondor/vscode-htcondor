    leave_in_queue = <ClassAd Boolean Expression>

When the ClassAd Expression evaluates to `True`, the job is not removed
from the queue upon completion. This allows the user of a remotely
spooled job to retrieve output files in cases where HTCondor would have
removed them as part of the cleanup associated with completion. The job
will only exit the queue once it has been marked for removal (via
*condor_rm*, for example) and the **leave_in_queue** expression has
become `False`. **leave_in_queue** defaults to `False`.

As an example, if the job is to be removed once the output is retrieved
with *condor_transfer_data*, then use

<div>

<div>

    leave_in_queue = (JobStatus == 4) && ((StageOutFinish =?= UNDEFINED) ||\
                     (StageOutFinish == 0))

</div>

</div>
