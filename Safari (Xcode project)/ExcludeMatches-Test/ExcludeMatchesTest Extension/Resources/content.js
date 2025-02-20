// ------------------------------------------------
// CONTENT.JS
// ------------------------------------------------
console.log("[CONTENT SCRIPT] - Content script declared in manifest")

chrome.runtime.sendMessage({ greeting: "hello-from-content" }).then((response) => {
    console.log("Received response: ", response);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request from background: ", request);
});

