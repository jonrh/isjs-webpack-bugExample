# isjs-webpack-bugExample
**Note 2016.01.03**: This issue has now been fixed in [pull request #138](https://github.com/arasatasaygin/is.js/pull/138/) of the [is.js](https://github.com/arasatasaygin/is.js) library. Many thanks go to @arasatasaygin, @ryantemple, and others for their excellent work. 

This repository is an example demonstration of a bug when requiring the brilliant
library [is.js](http://arasatasaygin.github.io/is.js/) with the module
bundler [webpack](http://webpack.github.io/).

is.js issue: [Issue when requiring is.js with webpack #100](https://github.com/arasatasaygin/is.js/issues/100)

## How to reproduce
To get started, clone this repository and make sure you have [node](https://nodejs.org/)
and [npm](https://www.npmjs.com/) installed and on the path. There are many
ways to install but the simplest thing is to install node, npm will be set up
as a byproduct. On the command prompt or terminal be located in this folder and type
the following:

```
npm install
npm start
```

The *install* command will fetch dependencies and *start* will fire up a
command that starts webpack in watch mode so it'll refire every time it detects
a file change (file save).

After running `npm start` webpack gives the following error:

```
ERROR in ./~/is_js/is.js
Module not found: Error: Cannot resolve module 'is' in C:\jonrh\isjs-webpack-bugExample\node_modules\is_js
 @ ./~/is_js/is.js 8:8-13:10
```

By commenting out the is_js require in the *main.js* file:

```
//var is = require("is_js");
```

webpack runs successfully:

```
Hash: af88c8ab21e822a3c570
Version: webpack 1.7.3
Time: 88ms
    Asset    Size  Chunks             Chunk Names
bundle.js  756 kB       0  [emitted]  main
   [0] ./main.js 505 bytes {0} [built]
    + 45 hidden modules
```

This can also be observed when running the *bundle.js* file that webpack exported:

```
Fake IP: 153.254.86.13
```

## Hacky fix
Note, this is a **very** hacky "fix" I stumbled upon. In the *is.js* (in the
*node_modules* folder) remove the following code (lines 6-14):

```javascript
if(typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['is'], function(is) {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.is = factory(is));
        });
    } else
```

so it'll look like this:

```javascript
// AMD with global, Node, or global
;(function(root, factory) {
    if(typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(require('is_js'));
    } else {
        // Browser globals (root is window)
        root.is = factory(root.is);
    }
}
```

I've no idea if this is save to do or not. But with this change and code
uncommented in the *main.js* file this is the output when running *bundle.js*:

```
Fake IP: 18.150.12.218
Is fake IP valid: true
```

## File and folder descriptions
* **main.js**: The example JavaScript code that generates the issue.
* **package.json**: Configuration file for the npm package manager, [see](https://docs.npmjs.com/files/package.json).
* **webpack.config.js**: Configuration file for webpack. Basically says what file we should bundle and what the name of the output file should be.
* **bundle.js**: A file generated by webpack, basically a single JS file containing our code and all dependencies.
* **node_modules**: A folder that will be generated and populated after running the `npm install` command.

