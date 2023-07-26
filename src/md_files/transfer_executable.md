    transfer_executable = <True | False>

This command is applicable to jobs submitted to the grid and vanilla
universes. If **transfer_executable** is set to `False`, then HTCondor
looks for the executable on the remote machine, and does not transfer
the executable over. This is useful for an already pre-staged
executable; HTCondor behaves more like rsh. The default value is `True`.
