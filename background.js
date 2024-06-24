// background.js

// Example usage of chrome.tabs.executeScript to inject content script into a tab
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // Check if the tab has finished loading
    if (changeInfo.status === 'complete') {
        // Inject content script into the tab
        chrome.tabs.executeScript(tabId, {
            file: 'content.js'
        }, function() {
            console.log('Content script injected into tab:', tabId);
        });
    }
});

// Example event listener in the background script
chrome.runtime.onInstalled.addListener(function() {
    console.log('Extension installed');
});

// Example initialization code in the background script
console.log('Background script initialized');
