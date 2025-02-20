# ExcludeMatches-Test

**Browser extension test on content script injection using `excludeMatches` array in `scripting.registerContentScript()` API**

#### Tests performed with:

Chrome version 133.0.6943.100

Edge version 133.0.3065.69

Firefox version 135.0.1

Safari version 18.3, MacOS Sequoia 15.3.1, XCode version 16.2

#### What is this test



The repository contains the extensions for Chromium, Firefox and Safari (complete XCode project) browsers.

What we are testing is if `scripting.registerContentScripts()` API works properly in the different browsers when the service worker injects a script using an `excludeMatches` array.

The `excludeMatches` array defines the array of pages that this content script is excluded from but would otherwise be injected into.

`const matches = ['*://*/*'];`

`const excludeMatches = ['*://*.example.com/*'];`

`const directive = {`

 `id: 'injected-jstest',`

 ` js: ['injectedscript.js'],`

 `matches: matches,`

 `excludeMatches: excludeMatches,`

 `persistAcrossSessions: false,`

 `runAt: 'document_start'`

`};`

`await chrome.scripting.registerContentScripts([directive])`

`.catch(reason => { console.log("[SW] >>> inject script error:",reason); });`

#### Test Results

The API is properly working in Chromium and Firefox browsers, where `excludeMatches `array is fully honored (script is injected everywhere **BUT** in `example.com` pages). 

in Safari, instead, the `excludeMatches `array is as if it did not exist (**totally ignored**), and the script is injected everywhere, including `example.com` pages. 

In addition, in Safari the script is injected multiple times into the same page (!!!), which also suggests an underlying problem with `scripting.registerContentScript()` API, or, even worse, in the management of the extension's service worker.

#### Test by yourself

Install the extension in the browser (Chromium/Firefox). 

For Safari, build the project in XCode and test.

#### Conclusions

Safari once again confirms its inconsistency, at least as far as web extensions are concerned. There are thousands of reports on the Apple Developer forum most of which have never received a shred of response from the so-called “Support Engineers.”

If anyone happens to be reading this README and has a solution to the problem, or has found some inconsistency/error in the code, please open a discussion or create an Issue. Thank you.
