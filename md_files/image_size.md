    image_size = <size>

Advice to HTCondor specifying the maximum virtual image size to which
the job will grow during its execution. HTCondor will then execute the
job only on machines which have enough resources, (such as virtual
memory), to support executing the job. If not specified, HTCondor will
automatically make a (reasonably accurate) estimate about the job's size
and adjust this estimate as the program runs. If specified and
underestimated, the job may crash due to the inability to acquire more
address space; for example, if malloc() fails. If the image size is
overestimated, HTCondor may have difficulty finding machines which have
the required resources. *size* is specified in KiB. For example, for an
image size of 8 MiB, *size* should be 8000.
