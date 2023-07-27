    job_ad_information_attrs = <attribute-list>

A comma-separated list of job ClassAd attribute names. The named
attributes and their values are written to the job event log whenever
any event is being written to the log. This implements the same thing as
the configuration variable `EVENT_LOG_INFORMATION_ATTRS` (see the
[Daemon Logging Configuration File
Entries](https://htcondor.readthedocs.io/en/latest/admin-manual/configuration-macros.html#daemon-logging-configuration-file-entries)
page), but it applies to the job event log, instead of the system event
log.
