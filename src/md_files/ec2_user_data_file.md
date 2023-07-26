    ec2_user_data_file = <pathname>

For grid type **ec2** jobs, specifies a path and file name whose
contents can be accessed by the virtual machine. If both
**ec2_user_data** and **ec2_user_data_file** are specified for a job,
the two blocks of data are concatenated, with the data from that
**ec2_user_data** submit command occurring first.
