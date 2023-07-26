    notify_user = <email-address>

Used to specify the e-mail address to use when HTCondor sends e-mail
about a job. If not specified, HTCondor defaults to using the e-mail
address defined by

<div>

<div>

    job-owner@UID_DOMAIN

</div>

</div>

where the configuration variable `UID_DOMAIN` is specified by the
HTCondor site administrator. If `UID_DOMAIN` has not been specified,
HTCondor sends the e-mail to:

<div>

<div>

    job-owner@submit-machine-name

</div>

</div>
