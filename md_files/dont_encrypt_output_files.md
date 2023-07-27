    dont_encrypt_output_files = < file1,file2,file… >

A comma and/or space separated list of output files that are not to be
network encrypted when transferred back with the file transfer
mechanism. Specification of files in this manner overrides configuration
that would use encryption. The output file(s) must also either be in the
list given by **transfer_output_files** or be discovered and to be
transferred back with the file transfer mechanism. When a path to an
output file or directory is specified, this specifies the path to the
file on the execute side. A single wild card character (`*`) may be used
in each file name.
