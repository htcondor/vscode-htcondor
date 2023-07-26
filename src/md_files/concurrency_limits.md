    concurrency_limits = <string-list>

A list of resources that this job needs. The resources are presumed to
have concurrency limits placed upon them, thereby limiting the number of
concurrent jobs in execution which need the named resource. Commas and
space characters delimit the items in the list. Each item in the list is
a string that identifies the limit, or it is a ClassAd expression that
evaluates to a string, and it is evaluated in the context of machine
ClassAd being considered as a match. Each item in the list also may
specify a numerical value identifying the integer number of resources
required for the job. The syntax follows the resource name by a colon
character (:) and the numerical value. Details on concurrency limits are
in the HTCondor Administrator's manual.
