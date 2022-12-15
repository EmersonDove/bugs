---
title: I just wrote a video file with GStreamer and I can't play it in any video player
position: 1
category: GStreamer
---

You need to add `-e` it's always `-e`.

Ok the reality of the debugging steps:
- First check if there is any legitimate amount of data in the output file, this can normally be done by running `ls -l` and checking to see if there are more than a few bits
- If there is actual data, and you still can't read it **make sure that you're closing the file stream**!!
  - If this is in the command line add `-e` to the end of the commend. This will make sure that the file is closed properly. If the file is not closed properly, other video players will hate you.
  - If you're using a library like OpenCV `VideoWriter` **make sure to run `.release`** to finish your stream
  - If you're doing anything else find the equivalent and make sure to do it

Even after closing it properly you might still not be able to preview it - your pipeline is probably still busted. However, checking that it is closed properly is step one and should always be step one.

I'm also a big fan of the videotestsrc