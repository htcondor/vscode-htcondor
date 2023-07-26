    retry_until <Integer | ClassAd Boolean Expression>

An integer value or boolean expression that prevents further retries
from taking place, even if **max_retries** have not been exhausted. If
**retry_until** is an integer, the job exiting with that exit code will
cause retries to cease. If **retry_until** is a ClassAd expression, the
expression evaluating to `True` will cause retries to cease. For
example, if you only want to retry exit codes 17, 34, and 81:

<div>

<div>

    max_retries = 5
    retry_until = !member( ExitCode, {17, 34, 81} )

</div>

</div>
