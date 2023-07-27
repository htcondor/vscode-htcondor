    nice_user = <True | False>

Normally, when a machine becomes available to HTCondor, HTCondor decides
which job to run based upon user and job priorities. Setting
**nice_user** equal to `True` tells HTCondor not to use your regular
user priority, but that this job should have last priority among all
users and all jobs. So jobs submitted in this fashion run only on
machines which no other non-nice_user job wants - a true bottom-feeder
job! This is very handy if a user has some jobs they wish to run, but do
not wish to use resources that could instead be used to run other
people's HTCondor jobs. Jobs submitted in this fashion have an
accounting group. The accounting group is configurable by setting
`NICE_USER_ACCOUNTING_GROUP_NAME` which defaults to `nice-user` The
default value is `False`.
