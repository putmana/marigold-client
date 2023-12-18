# Marigold

![Screenshot of Marigold](./static/public/images/screenshot.jpeg)


## Introduction

Marigold aims to give you the convenience of Spotify without the DRM.
Create an account, upload your own files, and stream them from anywhere.

I originally created Marigold as my college capstone project, but I enjoyed
the process so much that I decided to continue development and turn it into
a portfolip piece.


## Getting Started

See the live version [here](https://marigoldmusic.live/)

#### Disclaimer 

Marigold is currently in early alpha, meaning that things WILL change. 
I cannot promise that things won't break as development contunes, so please don't 
rely on Marigold as your only music app right now. 


## Development Plans

#### Currently Implemented:

- [x] Full rewrite for increased maintainability
- [x] Migration to PocketBase
- [x] Fully responsive UI
- [x] Color palette generator built from scratch using OKLAB color space
- [x] Immersive listening mode
- [x] User accounts
- [x] File uploading
- [x] New Demo 
- [x] File metadata integration (Marigold)

#### Top Priority:

- [ ] Code cleanup/refactor
- [ ] Smart uploading (Bulk upload your files -- Marigold will automatically parse file metadata and create albums)
- [ ] Metadata lookup (Search for a song/album and Marigold will pull the album art, tags, etc from the Internet)

####  Soon:

- [ ] Desktop application with Tauri
- [ ] Support for downloading your entire library
- [ ] Migration from Supabase to my own backend

#### Someday Maybe:

- [ ] Support for various stream qualities with FFMPEG
- [ ] Native iOS app

#### Pipe Dream:

- [ ] Native Android app
- [ ] Integration with a music vendor (i.e., Bandcamp) to make it easy to buy and port songs directly into Marigold
