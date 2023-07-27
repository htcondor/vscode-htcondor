    remove_kill_sig = <signal-number>

For the scheduler universe only, **signal-number** is the signal
delivered to the job when the job is removed with *condor_rm*.
**signal-number** may be either the platform-specific name or value of
the signal. This example shows it both ways for a Linux signal:

<div>

<div>

    remove_kill_sig = SIGUSR1
    remove_kill_sig = 10

</div>

</div>

If this command is not present, the value of **kill_sig** is used.
