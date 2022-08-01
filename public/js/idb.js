let db;
// establish connection
const request = indexedDB.open('budget', 1);

// if successful
request.onsuccess = function(event) {
    db = event.target.result;
    if (navigator.onLine) {
        uploadTransaction();
    }
};