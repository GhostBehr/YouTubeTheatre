// background
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains a 'g' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'youtube.com/watch' },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);

    chrome.pageAction.onClicked.addListener(function(tab) {
        // console.log("Julie, do the thing!");

        // console.log(tab.url);
        var vid = tab.url.match("v=.{11}")[0];
        vid = vid.substr(2);

        var maxurl = "http://www.youtube.com/v/" + vid + "&autoplay=1";

        chrome.tabs.update(tab.id, {url:maxurl});
    });
  });
});

