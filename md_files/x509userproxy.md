    x509userproxy = <full-pathname>

Used to override the default path name for X.509 user certificates. The
default location for X.509 proxies is the `/tmp` directory, which is
generally a local file system. Setting this value would allow HTCondor
to access the proxy in a shared file system (for example, AFS). HTCondor
will use the proxy specified in the submit description file first. If
nothing is specified in the submit description file, it will use the
environment variable X509_USER_PROXY. If that variable is not present,
it will search in the default location. Note that proxies are only valid
for a limited time. Condor_submit will not submit a job with an expired
proxy, it will return an error. Also, if the configuration parameter
CRED_MIN_TIME_LEFT is set to some number of seconds, and if the proxy
will expire before that many seconds, condor_submit will also refuse to
submit the job. That is, if CRED_MIN_TIME_LEFT is set to 60,
condor_submit will refuse to submit a job whose proxy will expire 60
seconds from the time of submission.

**x509userproxy** is relevant when the **universe** is **vanilla**, or
when the **universe** is **grid** and the type of grid system is one of
**condor**, or **arc**. Defining a value causes the proxy to be
delegated to the execute machine. Further, VOMS attributes defined in
the proxy will appear in the job ClassAd.
