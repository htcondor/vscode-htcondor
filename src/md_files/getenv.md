    getenv = <<matchlist> | True | False>

If **getenv** is set to `True`, then *condor_submit* will copy all of
the user's current shell environment variables at the time of job
submission into the job ClassAd. The job will therefore execute with the
same set of environment variables that the user had at submit time.
Defaults to `False`. A wholesale import of the user's environment is
very likely to lead to problems executing the job on a remote machine
unless there is a shared file system for users' home directories between
the access point and execute machine. So rather than setting getenv to
`True`, it is much better to set it to a list of environment variables
to import.

Matchlist is a comma, semicolon or space separated list of environment
variable names and name patterns that match or reject names. Matchlist
members are matched case-insensitively to each name in the environment
and those that match are imported. Matchlist members can contain `*` as
wildcard character which matches anything at that position. Members can
have two `*` characters if one of them is at the end. Members can be
prefixed with `!` to force a matching environment variable to not be
imported. The order of members in the Matchlist has no effect on the
result. `getenv`` ``=`` ``true` is equivalent to `getenv`` ``=`` ``*`

Prior to HTCondor 8.9.7 `getenv` allows only `True` or `False` as
values.

Examples:

<div>

<div>

    # import everything except PATH and INCLUDE (also path, include and other case-variants)
    getenv = !PATH, !INCLUDE

    # import everything with CUDA in the name
    getenv = *cuda*

    # Import every environment variable that starts with P or Q, except PATH
    getenv = !path, P*, Q*

</div>

</div>

If the environment is set with the **environment** command and
**getenv** is also set, values specified with **environment** override
values in the submitter's environment (regardless of the order of the
**environment** and **getenv** commands).
