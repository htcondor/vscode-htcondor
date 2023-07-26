    want_graceful_removal = <boolean expression>

If `true`, this job will be given a chance to shut down cleanly when
removed. The job will be given as much time as the administrator of the
execute resource allows, which may be none. The default is `false`. For
details, see the configuration setting
[GRACEFULLY_REMOVE_JOBS](https://htcondor.readthedocs.io/en/latest/admin-manual/configuration-macros.html#gracefully-remove-jobs).
