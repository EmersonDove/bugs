---
title: MacOS Code Signing Lore
position: 1
category: MacOS
---

## Checking Signatures
This is a really useful command:

`notarytool log --apple-id $APPLEID --password $APPLEIDPASS --team-id $MACOS_TEAMID`
where `APPLEID` is your Apple ID email, `APPLEIDPASS` something, and `MACOS_TEAMID` is your team ID
which should be visible in signing

This is helpful too:

`codesign -v -vvv --strict --deep`
or
`spctl -a -t exec --ignore-cache  -vv`

## MacOS signing bugs
In our case we had an issue with the signing finishing, all signatures checking out
but then when users opened the app it would verify, then wait a second, then it would
complain that it wasn't signed.

In our case the issue was cased by one of three packages that we removed simulateously and it
seems to have fixed it:
```yarn
"@mui/material": "^5.14.3",
"@emotion/react": "^11.11.1",
"@emotion/styled": "^11.11.0",
```

If you have one of these packages and your signing randomly broke, then this might be the issue.
