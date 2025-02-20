// ------------------------------------------------
// BACKGROUND.JS
// ------------------------------------------------
const matches = ['*://*/*'];
const excludeMatches = ['*://*.example.com/*'];

const directive = {
    id: 'injected-jstest',
    js: ['injectedscript.js'],
    matches: matches,
    excludeMatches: excludeMatches,
    persistAcrossSessions: false,
    runAt: 'document_start'
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    if (request.greeting === "hello-from-content") {
        console.log("Received request from content script (MANIFEST): ", request);
        sendResponse("Hi content script!" );
    }
    
    if (request.greeting === "hello-from-injected") {
        console.log("Received request from content script (INJECTED): ", request);
        sendResponse("Hi injected script!" );
    }
    return true;
});
// ------------------------------------------------
// un-Register all injected scripts
async function unregisterScripts() {
    let old = await chrome.scripting.getRegisteredContentScripts();
    if (Array.isArray(old) && old.length > 0) {
        await chrome.scripting.unregisterContentScripts({ids: old.map(s => s.id)});
        console.log(`1 - [SW] ${old.length} Content Scripts UNREGISTERED`);
    } else {
        console.log("1 - [SW] NO Content Scripts to remove");
    }
}
// ------------------------------------------------

// ------------------------------------------------
async function start() {
    await unregisterScripts();
    
    await chrome.scripting.registerContentScripts([directive])
    .catch(reason => { console.log("[SW] >>> inject script error:",reason); });
}
// ------------------------------------------------
start();

