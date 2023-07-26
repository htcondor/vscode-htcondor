    use_x509userproxy = <True | False>

Set this command to `True` to indicate that the job requires an X.509
user proxy. If **x509userproxy** is set, then that file is used for the
proxy. Otherwise, the proxy is looked for in the standard locations. If
**x509userproxy** is set or if the job is a grid universe job of grid
type **arc**, then the value of **use_x509userproxy** is forced to
`True`. Defaults to `False`.
