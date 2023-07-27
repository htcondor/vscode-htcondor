    ec2_keypair_file = <pathname>

For grid type **ec2** jobs, specifies the complete path and file name of
a file into which HTCondor will write an SSH key for use with ec2 jobs.
The key can be used to *ssh* into the virtual machine once it is
running. If **ec2_keypair** is specified for a job, **ec2_keypair_file**
is ignored.
