#JBake-watch-node#

Automatically re-bakes your [JBake](http://jbake.org/) site when a file changes.

##Pre-requisites##

* JBake 2.2.x
* [Node.js](http://nodejs.org/) 0.10.x

##Installation##

1. Download and unzip the [latest release](https://github.com/mwanji/jbake-watch-node/releases)
2. `npm install -g jbake-watch-node-$LATEST_RELEASE` (prefix with `sudo` if necessary)

##Usage##

In your project directory, run:

`jbakew`

This will launch the JBake server. The site will be re-baked every time you save a file. Saves happening in quick succession (such as "Save All") will only trigger one re-bake.
