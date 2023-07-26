    universe = <vanilla | scheduler | local | grid | java | vm | parallel | docker>

Specifies which HTCondor universe to use when running this job. The
HTCondor universe specifies an HTCondor execution environment.

The **vanilla** universe is the default (except where the configuration
variable `DEFAULT_UNIVERSE` defines it otherwise), and is an execution
environment for jobs which do not use HTCondor's mechanisms for taking
checkpoints; these are ones that have not been linked with the HTCondor
libraries. Use the **vanilla** universe to submit shell scripts to
HTCondor.

The **scheduler** universe is for a job that is to run on the machine
where the job is submitted. This universe is intended for a job that
acts as a metascheduler and will not be preempted.

The **local** universe is for a job that is to run on the machine where
the job is submitted. This universe runs the job immediately and will
not preempt the job.

The **grid** universe forwards the job to an external job management
system. Further specification of the **grid** universe is done with the
**grid_resource** command.

The **java** universe is for programs written to the Java Virtual
Machine.

The **vm** universe facilitates the execution of a virtual machine.

The **parallel** universe is for parallel jobs (e.g. MPI) that require
multiple machines in order to run.

The **docker** universe runs a docker container as an HTCondor job.
