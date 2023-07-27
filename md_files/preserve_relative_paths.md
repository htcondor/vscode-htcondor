    preserve_relative_paths = < True | False >

For vanilla and Docker -universe jobs (and others that use the shadow),
this command modifies the behavior of the file transfer commands. When
set to true, the destination for an entry that is a relative path in a
file transfer list becomes its relative path, not its basename. For
example, `input_data/b` (and its contents, if it is a directory) will be
transferred to `input_data/b`, not `b`. This applies to the input,
output, and checkpoint lists.

Trailing slashes are ignored when `preserve_relative_paths` is set.
