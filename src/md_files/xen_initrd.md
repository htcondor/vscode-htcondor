    xen_initrd = <image-file>

When **xen_kernel** gives a file name for the kernel image to use, this
optional command may specify a path to a ramdisk (`initrd`) image file.
If the image file will be transferred by HTCondor, then the value should
just be the simple file name (no path information).
