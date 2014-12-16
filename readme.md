# localwiki > dat importer

Interested in backing up a region of localwiki.org, or exploring/analyzing all the data on the site for some reason? Import localwiki pages into dat with this project!

## Install

- [Install node](http://nodejs.org/download)
- Clone this repo and cd into it
- Install dat: 'npm i -g dat'
- Change the region in the region.js file, or leave it as an empty string to download localwiki pages from all regions (which takes a while, because there are about 84,000 pages). Set to `seattle` by default
- `npm install`
- `dat init`
- `dat listen`

## Todo

This doesn't even try to back up versions, images, or map data from localwiki.org yet, but it could!