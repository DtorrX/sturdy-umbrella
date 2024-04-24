document.getElementById('download').addEventListener('click', function() {
    chrome.storage.local.get('highlights', function(data) {
        if (data.highlights) {
            const blob = new Blob([JSON.stringify(data.highlights, null, 2)], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'highlights.json';
            a.click();
        }
    });
});
