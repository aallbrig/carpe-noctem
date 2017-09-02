## Carpe Noctem Static Web Assets
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
Run `npm start` to begin development.

### Technologies
[Webpack + Node](https://webpack.github.io/) for static site development (see: `source/web/static`)
  - [TypeScript](https://www.typescriptlang.org/) (ES2015 + types!  It's basically scala!)
  - [React](https://facebook.github.io/react/) views
  - [Redux](http://redux.js.org/docs/basics/UsageWithReact.html) for game logic
  - [Phaser.io](http://phaser.io/) video game runner


### One Liners
Update dev dependencies to latest major version (assumes `jq` is installed).

    ```
    cat package.json | jq '.devDependencies' | sed s/\"//g | sed s/://g | sed '1,1d' | sed '$d' | awk '{print $1}' | while read line ; do npm install "$line"@latest --save-dev ; done
    ```
Update dependencies to latest major version (assumes `jq` is installed).

    ```
    cat package.json | jq '.dependencies' | sed s/\"//g | sed s/://g | sed '1,1d' | sed '$d' | awk '{print $1}' | while read line ; do npm install "$line"@latest --save ; done
    ```
Update test UI snapshots

    ```
    npm run test-update-ui-snapshots
    ```

Run tests

    ```
    npm test
    ```