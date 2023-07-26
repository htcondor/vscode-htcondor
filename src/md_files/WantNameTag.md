    WantNameTag = <True | False>

For grid type **ec2** jobs, a job may request that its 'name' tag be
(not) set by HTCondor. If the job does not otherwise specify any tags,
not setting its name tag will eliminate a call by the EC2 GAHP,
improving performance.
