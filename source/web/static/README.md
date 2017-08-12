## Carpe Noctem Static Web Assets
[Live Website Location](https://aallbrig.github.io/carpe-noctem/)

Assumptions:  All static web assets for this project are organized as a mono repo.  This may not always be true, but for now it is.

This is the folder in the repo for static web assets.  For the uninitiated, this is the source code that ultimately compiles into the raw HTML/CSS/JS that is served to the end user.

### Getting Started
Run `npm install` or `npm i` in this directory to install all required packages.

Run `npm start` for development.

Run `npm run compileDist` to create `dist` folder.

Run `npm run serveDist` to test that _static_ asserts are serving up correctly.

(Note: you can combine these two commands into a one-liner `npm run compileDist && npm run serveDist`)

Run `npm run deployDist` to copy artifacts to expected git pages subdirectory.

(Note: you can combine these two commands into a one-liner `npm run compileDist && npm run deployDist`)

### Running
Please run `npm start` to begin development.

Please run `TODO add prod to package.json` to start server in production mode.

### Technologies
1. Webpack
1. Typescript
