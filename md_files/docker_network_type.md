    docker_network_type = < host | none | custom_admin_defined_value>

If docker_network_type is set to the string host, then the job is run
using the host's network. If docker_network_type is set to the string
none, then the job is run with no network. If this is not set, each job
gets a private network interface. Some administrators may define site
specific docker networks on a given worker node. When this is the case,
additional values may be valid here.
