    requirements = <ClassAd Boolean Expression>

The requirements command is a boolean ClassAd expression which uses
C-like operators. In order for any job in this cluster to run on a given
machine, this requirements expression must evaluate to true on the given
machine.

For scheduler and local universe jobs, the requirements expression is
evaluated against the `Scheduler` ClassAd which represents the the
*condor_schedd* daemon running on the access point, rather than a remote
machine. Like all commands in the submit description file, if multiple
requirements commands are present, all but the last one are ignored. By
default, *condor_submit* appends the following clauses to the
requirements expression:

1.  Arch and OpSys are set equal to the Arch and OpSys of the submit
    machine. In other words: unless you request otherwise, HTCondor will
    give your job machines with the same architecture and operating
    system version as the machine running *condor_submit*.

2.  Cpus \>= RequestCpus, if the job ClassAd attribute `RequestCpus` is
    defined.

3.  Disk \>= RequestDisk, if the job ClassAd attribute `RequestDisk` is
    defined. Otherwise, Disk \>= DiskUsage is appended to the
    requirements. The `DiskUsage` attribute is initialized to the size
    of the executable plus the size of any files specified in a
    **transfer_input_files** command. It exists to ensure there is
    enough disk space on the target machine for HTCondor to copy over
    both the executable and needed input files. The `DiskUsage`
    attribute represents the maximum amount of total disk space required
    by the job in kilobytes. HTCondor automatically updates the
    `DiskUsage` attribute approximately every 20 minutes while the job
    runs with the amount of space being used by the job on the execute
    machine.

4.  Memory \>= RequestMemory, if the job ClassAd attribute
    `RequestMemory` is defined.

5.  If Universe is set to Vanilla, FileSystemDomain is set equal to the
    access point's FileSystemDomain.

View the requirements of a job which has already been submitted (along
with everything else about the job ClassAd) with the command *condor_q
-l*; see the command reference for [condor_q](https://htcondor.readthedocs.io/en/latest/man-pages/condor_q.html). Also, see
the HTCondor Users Manual for complete information on the syntax and
available attributes that can be used in the ClassAd expression.
