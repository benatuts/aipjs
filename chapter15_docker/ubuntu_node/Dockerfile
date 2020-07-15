# Start with the latest dockerhub image for Ubuntu 20.04
FROM ubuntu:20.04

# Update the Ubuntu package database
RUN apt-get update

# Install Node.js with the default package manager
# noninteractive is used to avoid asking to set the timezone
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install npm

# Copy the Node.js project into the container
COPY helloworld/ /helloworld/

# Set the default command for this Docker container
CMD node /helloworld/index.js
