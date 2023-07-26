    dont_encrypt_input_files = < file1,file2,file… >

A comma and/or space separated list of input files that are not to be
network encrypted when transferred with the file transfer mechanism.
Specification of files in this manner overrides configuration that would
use encryption. Each input file must also be in the list given by
**transfer_input_files** . When a path to an input file or directory is
specified, this specifies the path to the file on the submit side. A
single wild card character (`*`) may be used in each file name.
