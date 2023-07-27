    allowed_execute_duration = <integer>

The longest time for which a job may be executing. Jobs which exceed
this duration will go on hold. This time does not include file-transfer
time. Jobs which self-checkpoint have this long to write out each
checkpoint.

This attribute is intended to help minimize the time wasted by jobs
which may erroneously run forever.
