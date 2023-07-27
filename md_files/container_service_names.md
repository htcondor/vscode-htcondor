    container_service_names = <service-name>[, <service-name>]*

A string- or comma- separated list of *service name*s. Each
*service-name* must have a corresponding `<service-name>_container_port`
command specifying a port number (an integer from 0 to 65535). HTCondor
will ask Docker to forward from a host port to the specified port inside
the container. When Docker has done so, HTCondor will add an attribute
to the job ad for each service, `<service-name>HostPort`, which contains
the port number on the host forwarding to the corresponding service.
