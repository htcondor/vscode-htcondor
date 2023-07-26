    job_max_vacate_time = <integer expression>

An integer-valued expression (in seconds) that may be used to adjust the
time given to an evicted job for gracefully shutting down. If the job's
setting is less than the machine's, the job's is used. If the job's
setting is larger than the machine's, the result depends on whether the
job has any excess retirement time. If the job has more retirement time
left than the machine's max vacate time setting, then retirement time
will be converted into vacating time, up to the amount requested by the
job.

Setting this expression does not affect the job's resource requirements
or preferences. For a job to only run on a machine with a minimum
`MachineMaxVacateTime`, or to preferentially run on such machines,
explicitly specify this in the requirements and/or rank expressions.
