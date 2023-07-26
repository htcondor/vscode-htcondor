    skip_filechecks = <True | False>

When `True`, file permission checks for the submitted job are disabled.
When `False`, file permissions are checked; this is the behavior when
this command is not present in the submit description file. File
permissions are checked for read permissions on all input files, such as
those defined by commands **input** and **transfer_input_files** , and
for write permission to output files, such as a log file defined by
**log** and output files defined with **output** or
**transfer_output_files** .
