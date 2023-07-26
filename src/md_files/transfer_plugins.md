    transfer_plugins = < tag=plugin ; tag2,tag3=plugin2 … >

Specifies the file transfer plugins (see [Enabling the Transfer of Files
Specified by a
URL](https://htcondor.readthedocs.io/en/latest/admin-manual/setting-up-special-environments.html#enabling-the-transfer-of-files-specified-by-a-url))
that should be transferred along with the input files prior to invoking
file transfer plugins for files specified in *transfer_input_files*.
*tag* should be a URL prefix that is used in *transfer_input_files*, and
*plugin* is the path to a file transfer plugin that will handle that
type of URL transfer.
