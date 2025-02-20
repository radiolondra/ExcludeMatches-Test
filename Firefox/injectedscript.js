// ------------------------------------------------
// INJECTEDSCRIPT.JS
// ------------------------------------------------
( () => {

console.log("[INJECTED SCRIPT] - Content script injected by service worker");

const sendGreetingMessage = () => {
    chrome.runtime.sendMessage({greeting: "hello-from-injected" }).then((response) => {
        console.log("Received response: ", response);
    })
    .catch( (reason) => {
         console.log("Error:",reason);
    })
}

sendGreetingMessage();

})();
