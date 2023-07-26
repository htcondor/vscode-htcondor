    notification = <Always | Complete | Error | Never>

Owners of HTCondor jobs are notified by e-mail when certain events
occur. If defined by *Always*, the owner will be notified whenever the
job produces a checkpoint, as well as when the job completes. If defined
by *Complete*, the owner will be notified when the job terminates. If
defined by *Error*, the owner will only be notified if the job
terminates abnormally, (as defined by `JobSuccessExitCode`, if defined)
or if the job is placed on hold because of a failure, and not by user
request. If defined by *Never* (the default), the owner will not receive
e-mail, regardless to what happens to the job. The HTCondor User's
manual documents statistics included in the e-mail.
