document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.keyCode === 53) { // 53 is the key code for '5'
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();
        if (selectedText.length > 0) {
            saveHighlight(selectedText, 'text');
        }
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const container = range.commonAncestorContainer;
            container.querySelectorAll('img').forEach(img => {
                if (selection.containsNode(img, true)) {
                    saveHighlight(img.src, 'image');
                }
            });
        }
    }
});

function saveHighlight(content, type) {
    const highlight = {
        type: type,
        content: content,
        url: window.location.href,
        timestamp: new Date().toISOString()
    };
    chrome.storage.local.get({highlights: []}, function(result) {
        const highlights = result.highlights;
        highlights.push(highlight);
        chrome.storage.local.set({highlights: highlights});
    });
}
