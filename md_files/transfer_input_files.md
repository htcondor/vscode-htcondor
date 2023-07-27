    transfer_input_files = < file1,file2,file… >

A comma-delimited list of all the files and directories to be
transferred into the working directory for the job, before the job is
started. By default, the file specified in the **executable** command
and any file specified in the **input** command (for example, `stdin`)
are transferred.

When a path to an input file or directory is specified, this specifies
the path to the file on the submit side. The file is placed in the job's
temporary scratch directory on the execute side, and it is named using
the base name of the original path. For example, `/path/to/input_file`
becomes `input_file` in the job's scratch directory.

When a directory is specified, the behavior depends on whether there is
a trailing path separator character. When a directory is specified with
a trailing path separator, it is as if each of the items within the
directory were listed in the transfer list. Therefore, the contents are
transferred, but the directory itself is not. When there is no trailing
path separator, the directory itself is transferred with all of its
contents inside it. On platforms such as Windows where the path
separator is not a forward slash (/), a trailing forward slash is
treated as equivalent to a trailing path separator. An example of an
input directory specified with a trailing forward slash is
`input_data/`.

For grid universe jobs other than HTCondor-C, the transfer of
directories is not currently supported.

Symbolic links to files are transferred as the files they point to.
Transfer of symbolic links to directories is not currently supported.

For vanilla and vm universe jobs only, a file may be specified by giving
a URL, instead of a file name. The implementation for URL transfers
requires both configuration and available plug-in.

If you have a plugin which handles `https://` URLs (and HTCondor ships
with one enabled), HTCondor supports pre-signing S3 URLs. This allows
you to specify S3 URLs for this command, for `transfer_output_remaps`,
and for `output_destination`. By pre-signing the URLs on the submit
node, HTCondor avoids transferring your S3 credentials to the execute
node. You must specify `aws_access_key_id_file` and
`aws_secret_access_key_file`; you may specify `aws_region`, if
necessary; see below. To use the S3 service provided by AWS, use S3 URLs
of the following forms:

<div>

<div>

    # For older buckets that aren't region-specific.
    s3://<bucket>/<key>

    # For newer, region-specific buckets.
    s3://<bucket>.s3.<region>.amazonaws.com/<key>

</div>

</div>

To use other S3 services, where `<host>` must contain a `.`:

<div>

<div>

    s3://<host>/<key>

    # If necessary
    aws_region = <region>

</div>

</div>

You may specify the corresponding access key ID and secret access key
with `s3_access_key_id_file` and `s3_secret_access_key_file` if you
prefer (which may reduce confusion, if you're not using AWS).

If you must access S3 using temporary credentials, you may specify the
temporary credentials using `aws_access_key_id_file` and
`aws_secret_access_key_file` for the files containing the corresponding
temporary token, and `+EC2SessionToken` for the file containing the
session token.

Temporary credentials have a limited lifetime. If you are using S3 only
to download input files, the job must start before the credentials
expire. If you are using S3 to upload output files, the job must finish
before the credentials expire. HTCondor does not know when the
credentials will expire; if they do so before they are needed, file
transfer will fail.

HTCondor does not presently support transferring entire buckets or
directories from S3.

HTCondor supports Google Cloud Storage URLs -- `gs://` -- via Google's
"interoperability" API. You may specify `gs://` URLs as if they were
`s3://` URLs, and they work the same way. You may specify the
corresponding access key ID and secret access key with
`gs_access_key_id_file` and `gs_secret_access_key_file` if you prefer
(which may reduce confusion).

Note that (at present), you may not provide more than one set of
credentials for `s3://` or `gs://` file transfer; this implies that all
such URLs download from or upload to the same service.
