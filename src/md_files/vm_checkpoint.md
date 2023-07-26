    vm_checkpoint = <True | False>

A boolean value specifying whether or not to take checkpoints. If not
specified, the default value is `False`. In the current implementation,
setting both **vm_checkpoint** and **vm_networking** to `True` does not
yet work in all cases. Networking cannot be used if a vm universe job
uses a checkpoint in order to continue execution after migration to
another machine.
