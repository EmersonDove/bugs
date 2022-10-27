---
title: zeromq in electron
position: 1
category: Node.js

---

ZeroMQ is a great socket library and very useful to use locally with electron to communicate to other processes. The module itself is beginning to age a bit and to use it requires a very specific setup.

1. **Make sure you're running `Node v12`, `npm 6.13.4`, `electron 3.0.15`**. Newer node and electron versions may work but it is trial and error. Note the electron here is years out of date and the goals of your project should be seriously considered before downgrading this much.

2. `npm install` like usual 

3. You may have to run the `preinstall.js` script if npm doesn't generate the `libzmq` libs. This step is very undocumented but has cost me many hours in the past.

4. `cd <your_proj_dir>/node_modules/zeromq/build`

5. Run `make`

6. Should give you this (I'm using clang in this case):

   1. ```
      $   SOLINK_MODULE(target) Release/zmq.node
      clang: error: no such file or directory: './Release/../../zmq/lib/libzmq.a'
      make: *** [Release/zmq.node] Error 1
      ```

7. Then if you run the preinstall script to pull the libraries and everything else (go up one directory so you are in the root directory of zeromq).
8. Run `node scripts/preinstall.js`
9. That should run to completion and successfully build. You can confirm this by checking... `ls zmq/lib` And you should see: `libzmq.a libzmq.la pkgconfig` Now you should be able to go back to your project directory and get this to run...if not try running `electron-rebuild` to get it to compile the binaries for the specific version of node that electron is using under the hood.

