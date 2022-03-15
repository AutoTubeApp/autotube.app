---
index: 110
category: Cookbook
title: Set up an IPFS server for AutoTube
dLink: Set up an IPFS server
description: This tutorial will walk you through setting up an IPFS server for the AutoTube video sharing application.
---

# Work In Progress

# Set up an IPFS server for AutoTube

In this tutorial, we will set up an IPFS server for the AutoTube video sharing application.  
That means that we will set up an IPFS node and then set up a reverse proxy web server which will handle and secure your node.

## Requirements
- A linux machine which is publicly accessible through the internet.  
  For example an [Amazon EC2](https://aws.amazon.com/ec2/). In my case i will set up a [Scaleway instance](https://www.scaleway.com/en/).
- A domain name. For example `autotube.app`.
- Some knowledge on Linux administration (really just the basics).

## Set up the Linux box
The first question you have to answer is: what kind of instance do i need ?  
It will only depend on the amount of storage you need to store your videos.
Note that some providers allow you to easily upgrade your storage capacity afterwards. 

For this tutorial, we will use [Ubuntu](https://www.ubuntu.com/) Linux distribution version 20.04 LTS so i encourage you to use the same distro/version even
if this tutorial should be ok with other "Debian compatible" distributions .

The first thing you have to do when your server is up is to be sure that it's up-to-date. 
This is done by running the following command:

```shell
$ sudo apt-get update
$ sudo apt-get upgrade
```


## Set up the IPFS node


## Set up the reverse proxy

