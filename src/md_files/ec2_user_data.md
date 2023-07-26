    ec2_user_data = <data>

For grid type **ec2** jobs, provides a block of data that can be
accessed by the virtual machine. If both **ec2_user_data** and
**ec2_user_data_file** are specified for a job, the two blocks of data
are concatenated, with the data from this **ec2_user_data** submit
command occurring first.
