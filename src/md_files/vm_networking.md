    vm_networking = <True | False>

Specifies whether to use networking or not. In the current
implementation, setting both **vm_checkpoint** and **vm_networking** to
`True` does not yet work in all cases. Networking cannot be used if a vm
universe job uses a checkpoint in order to continue execution after
migration to another machine.
