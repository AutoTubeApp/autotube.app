---
title: AutoTube now supports IPFS 
description: Get a fully decentralized video player with AutoTube and IPFS.
createdAt: '2022-03-13T09:37:29.668Z' 
tags:
- ipfs
- decentralization
---

Since versions 0.2.0, AutoTube supports [IPFS](https://ipfs.io/).  

By using IPFS, each video player will act as an IPFS node and will share videos it had played with other players.   
AutoTube with IPFS will result in a fully **decentralized video player**:
- Each video is duplicated on the network.
- Each video is available from multiple IPFS nodes.
- The bandwidth is not only provided by the node where you have uploaded a video, but by all nodes who have the video.  
  It's result on a kind of CDN.
- It will be much more difficult to block the broadcast of the video.

## Demo of a video created with AutoTube streamed from IPFS 

<AutotubePlayer :ratio="2.387" src="https://ipfs.autotube.app/ipfs/QmNWm1a4YZ9p4CJMv6CPJ4PoNDs1jvUFzWTjPDTSeTxPtA">

</AutotubePlayer>
<p style="text-align: center; font-size: 0.875rem; color: darkgrey">© Blender Foundation | cloud.blender.org/spring</p>

When a video is uploaded to IPFS, the HTML package bundled with AutoTube will display information about peers
exchange.  
You can see an exemple here: https://ipfs.autotube.app/ipfs/QmXZoufYh1d99TXzmJpyAdg5WhFxkVzdDpUZqqCF78FsG5/  
For developers, you can open you dev console and see some debug messages (set "All levels" to "Log level" to see them):

## Hum ok but... What is IPFS ?

From [IPFS website](https://ipfs.io/):

> A peer-to-peer hypermedia protocol
> designed to preserve and grow humanity's knowledge
> by making the web upgradeable, resilient, and more open.

Concretely, see IPFS as computers that are connected to each other. Each computer is called a node and each
node store files.  
If you want to retrieve a file, you just need to ask one node (any node) to give you the file. If it has the file, it
will give you back, otherwise it will ask other nodes:  
> hey guys, is anybody have that file ?   
The node who has the file will give it to your node, and your node will give it to you.  
But it'll not only give it to you, it will also save it, so in the future, if someone asks for the same file, it will be able to
deliver it.  
As you can see, the more a file is asked from different nodes, the more it will be available because it will be saved on
more and more nodes.

## And what are the disadvantages ?
For now the only one is that you have to set up an IPFS server.
But don't worry, it's not that hard.  
Check out our documentation on [how to set up an IPFS server for AutoTube](/docs/setup-ipfs-server).

