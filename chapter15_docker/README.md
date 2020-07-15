# Chapter 15: Docker examples

This project is sample code of two Dockerfiles.

Note that Docker is not supported for Windows Subsystem for Linux 1 (WSL1).

## Usage instructions

### Linux Setup

Ensure that Docker is installed and running.

1. Install Docker
2. Add your user to the Docker group: `sudo usermod -aG docker $(whoami)`
3. Logout and login again, to ensure that your group information is fully loaded
4. Start the Docker daemon: `sudo systemctl start docker`

On subsequent reboots of your computer, you will only need to start the docker daemon.

You can use the `sudo systemctl enable docker` command to automatically start the Docker daemon on every reboot.

### Building and running the containers

1. `docker build -t ubuntu_node ubuntu_node/` to build the project in `ubuntu_node/` and tag with `ubuntu_node`
2. `docker build -t docker_node docker_node/` to build the project in `docker_node/` and tag with `docker_node`
3. `docker image ls` to view all the container images
4. `docker run --rm ubuntu_node` to run the default command of the `ubuntu_node` container
5. `docker run --rm docker_node` to run the default command of the `docker_node` container
