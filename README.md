# isjs-webpack-bugExample
Demonstration of a bug when using is_js with webpack

## How to get started
To get started, [node](https://nodejs.org/) and [npm](https://www.npmjs.com/)
have to be installed and be on the path. There are many ways to install but the
simplest thing is to install node, npm will be set up as well. On the command
prompt or terminal be located in this folder and type the following:

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

By commenting out the is_js require:

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

