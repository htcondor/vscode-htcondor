    encrypt_execute_directory = <True | False>

Defaults to `False`. If set to `True`, HTCondor will encrypt the
contents of the remote scratch directory of the machine where the job is
executed. This encryption is transparent to the job itself, but ensures
that files left behind on the local disk of the execute machine, perhaps
due to a system crash, will remain private. In addition, *condor_submit*
will append to the job's **requirements** expression

<div>

<div>

    && (TARGET.HasEncryptExecuteDirectory)

</div>

</div>

to ensure the job is matched to a machine that is capable of encrypting
the contents of the execute directory. This support is limited to
Windows platforms that use the NTFS file system and Linux platforms with
the *ecryptfs-utils* package installed.
