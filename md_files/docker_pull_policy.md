    docker_pull_policy = < always >

if docker_pull_policy is set to *always*, when a docker universe job
starts on a worker node, the option "--pull always" will be passed to
the docker run command. This only impacts worker nodes which already
have a locally cached version of the image. With this option, docker
will always check with the repo to see if the cached version is out of
date. This requires more network connectivity, and may cause docker hub
to throttle future pull requests. It is generally recommened to never
mutate docker image tag name, and avoid needing this option.
