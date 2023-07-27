    priority = <integer>

An HTCondor job priority can be any integer, with 0 being the default.
Jobs with higher numerical priority will run before jobs with lower
numerical priority. Note that this priority is on a per user basis. One
user with many jobs may use this command to order his/her own jobs, and
this will have no effect on whether or not these jobs will run ahead of
another user's jobs.

Note that the priority setting in an HTCondor submit file will be
overridden by *condor_dagman* if the submit file is used for a node in a
DAG, and the priority of the node within the DAG is non-zero (see
[Advanced Features of
DAGMan](https://htcondor.readthedocs.io/en/latest//users-manual/dagman-workflows.html#advanced-features-of-dagman)
for more details).
