var popupWindow = window.open(
    chrome.extension.getURL("index.html"),
    "EXtension",
    "width=400,height=400"
);
window.close(); // close the Chrome extension pop-up