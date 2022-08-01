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
// version changer
request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('new_transaction', { autoIncrement: true });
};
// on ERROR
request.onerror = function(event) {
    console.log(event.target.errorCode);
};