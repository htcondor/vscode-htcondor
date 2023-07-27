    manifest_dir = <directory name>

For vanilla and Docker -universe jobs (and others that use the shadow),
specifies the directory in which to record the manifest. Specifying this
enables the creation of a manifest. By default, the manifest directory
is named `<cluster>_<proc>_manifest`, to avoid conflicts.

This feature is not presently available for Windows.
