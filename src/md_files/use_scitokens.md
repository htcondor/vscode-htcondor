    use_scitokens = <True | False | Auto>

Set this command to `True` to indicate that the job requires a scitoken.
If **scitokens_file** is set, then that file is used for the scitoken
filename. Otherwise, the the scitoken filename is looked for in the
`BEARER_TOKEN_FILE` environment variable. If **scitokens_file** is set
then the value of **use_scitokens** defaults to `True`. If the filename
is not defined in on one of these two places, then *condor_submit* will
fail with an error message. Set this command to `Auto` to indicate that
the job will use a scitoken if **scitokens_file** or the
`BEARER_TOKEN_FILE` environment variable is set, but it will not be an
error if no file is specified.
