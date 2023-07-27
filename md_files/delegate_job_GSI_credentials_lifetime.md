    delegate_job_GSI_credentials_lifetime = <seconds>

Specifies the maximum number of seconds for which delegated proxies
should be valid. The default behavior when this command is not specified
is determined by the configuration variable
`DELEGATE_JOB_GSI_CREDENTIALS_LIFETIME` , which defaults to one day. A
value of 0 indicates that the delegated proxy should be valid for as
long as allowed by the credential used to create the proxy. This setting
currently only applies to proxies delegated for non-grid jobs and for
HTCondor-C jobs. This variable has no effect if the configuration
variable `DELEGATE_JOB_GSI_CREDENTIALS` is `False`, because in that case
the job proxy is copied rather than delegated.
