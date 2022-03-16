---
index: 110
category: Cookbook
title: Set up an IPFS server for AutoTube
dLink: Set up an IPFS server
description: This tutorial will walk you through setting up an IPFS server for the AutoTube video sharing application.
---
# Set up an IPFS server for AutoTube

In this tutorial, we will set up an IPFS server for the AutoTube video sharing application.  
First we will set up an IPFS node and then set up a reverse proxy web server which will handle public requests and secure your node.

## Requirements
- A linux server (bare metal or instance) which is publicly accessible through the internet.  
  For example an [Amazon EC2](https://aws.amazon.com/ec2/). In my case i will set up a [Scaleway instance](https://www.scaleway.com/en/).
- A domain name. For this tutorial I will use `ld83.com`.
- Some knowledge on Linux administration (really just the basics).

## Set up the Linux box
The first question you have to answer is: what kind of instance do i need ?  
It will only depend on the amount of storage you need for your videos.
Note that some providers allow you to easily upgrade your storage capacity afterwards. 

For this tutorial, we will use [Ubuntu](https://www.ubuntu.com/) Linux distribution version 20.04 LTS so i encourage you 
to use the same distro/version even if this tutorial should be ok with other "Debian compatible" distributions .

The first thing you have to do, when your server is up, is to be sure that it's up-to-date. 
Connect to the server as root and run the following command:

```shell
apt-get update
apt-get upgrade
```

As we will need a user account to run the IPFS node, let's create one now:
```shell
adduser -m ipfs
```

We also need to tweak UDP buffer size:
```shell
sysctl -w net.core.rmem_max=2500000
```

After updating your system, reboot your server:
```shell
reboot && exit
```

## Set up the IPFS node
### Install IPFS
At the time of this tutorial, the current version of [IPFS](https://ipfs.io/) is 0.12.0, 
check the [official documentation](http://docs.ipfs.io/install/command-line/#linux) to check the latest version.  
Download IPFS and extract it:

```shell
cd /tmp
wget https://dist.ipfs.io/go-ipfs/v0.12.0/go-ipfs_v0.12.0_linux-amd64.tar.gz
tar -xvzf go-ipfs_v0.12.0_linux-amd64.tar.gz

> x go-ipfs/install.sh
> x go-ipfs/ipfs
> x go-ipfs/LICENSE
> x go-ipfs/LICENSE-APACHE
> x go-ipfs/LICENSE-MIT
> x go-ipfs/README.md
```
Change dir to `go-ipfs` and install IPFS:
```shell
cd go-ipfs
bash install.sh

> Moved ./ipfs to /usr/local/bin
```
Test your installation by running the following command:
```shell
ipfs --version

> ipfs version 0.12.0
```
### Initialize the IPFS node
Now that we have IPFS installed, we need to initialize it.
But as we want to run it with `ipfs` user account, we need to switch to this account first:
```shell
su ipfs
cd /home/ipfs
```
Then run the following command to initialize the node:
```shell
ipfs init --profile server
```
The result should be:
```shell
generating ED25519 keypair...done
peer identity: 12D3KooWCRSktXixNBQGfuCFUqpEdKL7gsxpb9rUrTDPQ3VbDDDZ
initializing IPFS node at /home/ipfs/.ipfs
to get started, enter:

        ipfs cat /ipfs/QmQPeNsJPyVWPFDVHb77w8G42Fvo15z4bG2X8D2GhfbSXc/readme
```
### Configure IPFS
The next step is to configure the node.  
The configuration file is located at `/home/ipfs/.ipfs/config`. It's a JSON file.  
Options are explained in the [official documentation](http://docs.ipfs.io/reference/config/).  
To edit the configuration file, run the following command:
```shell
nano /home/ipfs/.ipfs/config
```

We will set the following options to allow the node to be accessed using browsers (and browser based application like 
AutoTube which is built on top of Chrome via  [electron](https://electronjs.org/)).  

Change***API.HTTPHeaders*** from:
```json
  "API": {
    "HTTPHeaders": {}
  },
```
to:
```json
  "API": {
    "HTTPHeaders": {
      "Access-Control-Allow-Credentials": [
        "true"
      ],
      "Access-Control-Allow-Methods": [
        "PUT",
        "GET",
        "POST"
      ],
      "Access-Control-Allow-Origin": [
        "*",
      ],
      "Access-Control-Max-Age": [
        "86400"
      ]
    }
  },
 ```
***WARNING***: Change https://ipfs.ld83.com to your domain name.

In the `Addresses.Swarm` array, add `"/ip4/0.0.0.0/tcp/4003/ws"` to the end of the array.
```json
"Swarm": [
  "/ip4/0.0.0.0/tcp/4001",
  "/ip6/::/tcp/4001",
  "/ip4/0.0.0.0/udp/4001/quic",
  "/ip6/::/udp/4001/quic",
  "/ip4/0.0.0.0/tcp/4003/ws"
]
```

### Make IPFS run as a service
Now that we have configured our IPFS node, we need to make it run as a service.  
That's mean that it will be automatically started when the server is rebooted.  
Exit ipfs user account:
```shell
exit
```
Add the service script to the server:
```shell
nano /etc/systemd/system/ipfs.service
```
Copy and paste the following script to the file:
```systemd
[Unit]
Description=IPFS daemon
After=network.target

[Service]
User=ipfs
ExecStart=/usr/local/bin/ipfs daemon
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
Save the file `ctrl o`, exit from nano `ctrl x` and run the following command to enable the service:
```shell
systemctl enable ipfs
```
Now we can start the service by running the following command:
```shell
systemctl start ipfs
```
We are done! Our IPFS node is now up and running 🍾
Hum yes, but we need to configure the node to be accessible from the outside.  
To do that, we will use [Caddy server](https://caddyserver.com/) as a reverse proxy.  
But before, even if it's useless for now, here is how to update your IPFS node to the latest version:

### How to update the IPFS node ?
To update the IPFS node, we will use [ipfs-update](http://docs.ipfs.io.ipns.localhost:8082/install/ipfs-updater/#install-update) binary.  
First, install it:
```shell
cd /tmp
wget https://dist.ipfs.io/ipfs-update/v1.7.1/ipfs-update_v1.7.1_linux-amd64.tar.gz
tar -xvzf ipfs-update_v1.7.1_linux-amd64.tar.gz
cd ipfs-update
sudo bash install.sh
```
To know the latest version of IPFS, run the following command:
```shell
ipfs-update versions
```
To nox the current version of your IPFS node, run the following command:
```shell
ipfs-update version
```
If a version is available, run the following command to update your IPFS node:
```shell
ipfs-update install vx.y.z
```
With `vx.y.z` being the version you want to update to.  

## Install and configure Caddy as a reverse proxy
[Caddy](https://caddyserver.com/) is a lightweight HTTP/2 web server which can act as a reverse proxy.  
What's the purpose of a reverse proxy ?  
A reverse proxy is a server that forwards requests from internet to your local IPFS node.
It will allow you to access your IPFS node from the internet.

### Install Caddy
To install Caddy, run the following command as root:
```shell
apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
| tee /etc/apt/trusted.gpg.d/caddy-stable.asc
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
| tee /etc/apt/sources.list.d/caddy-stable.list
apt update
apt install caddy
```
### Configure Caddy
At first, as we will protect the API access from the outside, we will need to create a *user* and a *password* for the API access.  
For this tutorial, we will use the following credentials:
```text
user: admin
password: adminPassword
```
As we can't put plain text password in the config file we will hash it : 
```shell
caddy hash-password --plaintext adminPassword
```
This command will output something like this:
```text
JDJhJDE0JFpOdWIvaFBxSnc1NUZkMzIyenNpeC50VjhKYk9WM1o5WlJnbDdOTDloL2RxQVZpbzh1ZnRP
```
Your credentials string will be:
```text
admin JDJhJDE0JFpOdWIvaFBxSnc1NUZkMzIyenNpeC50VjhKYk9WM1o5WlJnbDdOTDloL2RxQVZpbzh1ZnRP
```
To configure Caddy, we need to edit the `/etc/caddy/Caddyfile` file:
```shell
nano /etc/caddy/Caddyfile
```
Remove all the content and paste the following script:  
***Warning***: you need to change `ipfs.ld83.com` to the hostname of your IPFS node. And make sure that this hostname 
resolves to the public IP address of your IPFS node.      
***Warning 2***: change YOUR_CREDENTIALS_HERE to the credentials string you have created above.

```caddy
ipfs.ld83.com {
        # matches all requests excepts OPTIONS
        @auth_matcher {
                not method OPTIONS
                path /api/*
        }
        # matches all OPTIONS requests
        @options_matcher {
                method OPTIONS
        }
        
        # OPTIONS -> cors preflight -> send Access-Control headers
        handle @options_matcher {
                header {
                        Access-Control-Allow-Credentials true
                        Access-Control-Allow-Origin {header.origin}
                        Access-Control-Allow-Headers "Authorization, X-Requested-With, range"
                        Access-Control-Allow-Methods "GET, POST, PUT"
                        Access-Control-Max-Age 86400
                }
                respond 204
        }

        # disable auth on OPTIONS requests
        basicauth auth_matcher {
                YOUR_CREDENTIALS_HERE
        }
        # remove go-ipfs server header
        header server Caddy
        # reverse proxy for the API
        reverse_proxy /api/* 127.0.0.1:5001
        # reverse proxy for the gateway
        reverse_proxy /ipfs/* 127.0.0.1:8080
        # reverse proxy p2p
        reverse_proxy /p2p/*  127.0.0.1:4003
        
        log {
             output file /var/log/caddy/access.log
             format console
        }
}
```
Then we need to restart Caddy:
```shell
systemctl restart caddy
```

If everything went well, you can open your browser and go to `https://YOUR_HOSTNAME/webui` (ex: `https://ipfs.ld83.com/webui`) 
, after logging in with the credentials you have created, your browser will display the IPFS node dashboard.    

## Public Gateway or not ?
With the current configuration, anyone can use the `/ipfs/` path of your IPFS node to access any IPFS ressource, 
your node act as a **public** gateway.  
It's up to you to decide if you want to keep your gateway public or not.  
But note that if you want to make it private, you need to be able to serve, at least, the videos you will upload.  
Keep in mind that your `base url` in your `upload target` AutoTube configuration will be your public gateway 
aka `https://YOUR_HOSTNAME/`. 
So this URL must be accessible from the outside if you want to share your videos.   
There is an option in the IPFS config for this purpose, it's the `Gateway.NoFetch` option.  
If you enable this option, your gateway will serve only the files you have uploaded or pinned on it.

### How to keep webui up to date if Gateway.NoFetch is true ?
The path `/webui` is in fact an alias to a true IPFS path. 
So if you want to keep the webui available, you need to pin the IPFS address corresponding to `/webui` path.   
To do so, go to the `/webui` path, the URL in the browser will change to something like:  
`https://ipfs.ld83.com//ipfs/bafybeihcyruaeza7uyjd6ugicbcrqumejf6uf353e5etdkhotqffwtguva/#/welcome`

Where `bafybeihcyruaeza7uyjd6ugicbcrqumejf6uf353e5etdkhotqffwtguva` is the IPFS address, it's CID, of the `/webui` path.

You can pin this IPFS CID with the following command (to run as ipfs user):
```shell
ipfs pin add bafybeihcyruaeza7uyjd6ugicbcrqumejf6uf353e5etdkhotqffwtguva
```

Pinning an IPFS CID tels IPFS that you want to keep the corresponding content in your node.    

Now you can set the `Gateway.NoFetch` option to `true` in your IPFS config file, and you will keep your webui working.  
If, if the future, you want to update your webui, you just need to pin the new version of the webui by reproducing the 
previous steps.






