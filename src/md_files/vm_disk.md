    vm_disk = file1:device1:permission1, file2:device2:permission2:format2, …

A list of comma separated disk files. Each disk file is specified by 4
colon separated fields. The first field is the path and file name of the
disk file. The second field specifies the device. The third field
specifies permissions, and the optional fourth field specifies the image
format. If a disk file will be transferred by HTCondor, then the first
field should just be the simple file name (no path information).

An example that specifies two disk files:

<div>

<div>

    vm_disk = /myxen/diskfile.img:sda1:w,/myxen/swap.img:sda2:w

</div>

</div>
