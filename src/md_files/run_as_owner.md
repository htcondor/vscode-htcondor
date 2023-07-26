    run_as_owner = <True | False>

A boolean value that causes the job to be run under the login of the
submitter, if supported by the joint configuration of the submit and
execute machines. On Unix platforms, this defaults to `True`, and on
Windows platforms, it defaults to `False`. May not be used with
**load_profile** . See the HTCondor manual Platform-Specific Information
chapter for administrative details on configuring Windows to support
this option.
