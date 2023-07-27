    cuda_version = <version>

The version of the CUDA runtime, if any, used or required by this job,
specified as `<major>.<minor>` (for example, `9.1`). If the minor
version number is zero, you may specify only the major version number. A
single version number of 1000 or higher is assumed to be the
integer-coded version number
(`major`` ``*`` ``1000`` ``+`` ``(minor`` ``%`` ``100)`).

This does *not* arrange for the CUDA runtime to be present, only for the
job to run on a machine whose driver supports the specified version.
