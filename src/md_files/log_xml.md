    log_xml = <True | False>

If **log_xml** is `True`, then the job event log file will be written in
ClassAd XML. If not specified, XML is not used. Note that the file is an
XML fragment; it is missing the file header and footer. Do not mix XML
and non-XML within a single file. If multiple jobs write to a single job
event log file, ensure that all of the jobs specify this option in the
same way.
