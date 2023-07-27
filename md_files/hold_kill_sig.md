    hold_kill_sig = <signal-number>

For the scheduler universe only, **signal-number** is the signal
delivered to the job when the job is put on hold with *condor_hold*.
**signal-number** may be either the platform-specific name or value of
the signal. If this command is not present, the value of **kill_sig** is
used.
