---
index: 2
title: Publish a video with AutoTube
description: how to publish a video on the internet with AutoTube.
prev: installation
---
# Publish a video

## Requirements

- The video to publish.
- A hosting space, where you will put the generated package.

Of course, you don't need to maintain your own webserver, you can just use any web hosting plan or S3 storage.

This remote repositories where your video package will be uploaded by AutoTube will be designated
as **remote target** in this documentation.

## Configure a remote target

Reminder: a remote target is where AutoTube will upload your generated video package.

Click on the "Upload Targets", in the File menu:

<img src="/img/docs/open-remote-target.png" alt="Download FFmepg" width="80%" />

The click on the "+" sign:

<img src="/img/docs/add-remote-target.png" alt="Download FFmepg" width="80%" />

This will pop up a card:

<img src="/img/docs/card-remote-target.png" alt="Download FFmepg" width="80%" />

Note that at the right of each field you have a "?" sign, just pass your mouse hover it, and
you will have contextual help about the field.

You must select the **Type** at first. It represents the type of the remote target and/or the protocol 
used to upload files on the remote server.

Available types are :

- SFTP: FTP over SSH
- Amazon S3 (and compatible)
- FTP: use ftp at last ressort. This protocol is less secure.

Note that all your configuration will be encrypted with AES 256 using a unique key (generated at first launch).

The "Base URL" even if it's not required, must be very useful. It represents the public URL to 
access to your remote target and is used to generate public link to your publication.

## Create a new project

On the Files menu, click on "New project":

<img src="/img/docs/new-project.png" alt="Create a new project with AutoTube" width="80%" />

Then, drag and drop your video on the grayed zone, and you will see the "encoding options" panel.

## Encoding options

<img src="/img/docs/encoding-option.png" alt="AutoTube video encoding options" width="80%" />

#### Project name
It's the name of your project. It will be used as folder name for the generated package.  
For example, if the project name is "martien2" the public link to your video will be:

```
base_url/martien2/index.html
```

By default, the project name is the name of your video file.

#### Local output path
It's the path where the video package will be generated on your computer.
If you want to keep a local version of the package, set it, otherwise a temporary path will be used.

#### Remote Target
Select here the location where you want to upload the generated video package.

#### Encoder
Depending on your config you may have multiple choices for the encoder.
Normally you should always have libx264 and if you have a graphic card which support video encoding you may have another 
one (like h264_nvenc or videotoolbox on macOS).  
Note that if a hardware-accelerated video encoder is fastest, it **generally** produce lower quality. 
So if you use a hardware-accelerated video encoder increase the bitrate.

#### Streams

In this section you will configure the 3 streams that AutoTube will produce.  
The idea behind producing multiple streams is to be able to propose to each viewer a stream corresponding
to its settings, essentially to its available bandwidth.  

The config only depends on your needs, your video (frame rate, movements,...) and your targeted audience.  
You can use this as base, considering a 24 fps video:

|   Resolution    |  &nbsp;  Bitrate (Kb/s |
|-----------------|:---------------:|
| 480p  | 1000
| 720p  | 3000
| 1080p | 6000
| 2560p | 8000

.&nbsp;  
    

#### Encoding and uploading
Once your config is defined, click on the "Encode and export button":

<img src="/img/docs/encoding-upload-done.png" alt="AutoTube export video" width="80%" />

If you have correctly configured your "base URL" setting, if you click on the "watch your video" button, 
a browser windows will open with  your playable video (if you do not set the base_url setting or if it's wrong, 
just open yourself your browser to the root public URL of your webserver and add the "project_name/" at the end of the URL :   

<img src="/img/docs/autotube-default-player.png" alt="AutoTube default player" width="80%" />

As you can see on this screenshot, the default page display HTML code to use in order to embed the player in any web page.
