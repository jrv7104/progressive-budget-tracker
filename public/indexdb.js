let db ;

let request = indexedDB.open("budget", 1)

request.onupgradeneeded = (event) => {
    let database = event.target.result;
    database.createObjectStore("pending", {
        autoIncrement: true,
    })
}

request.onsuccess = (event) => {
    db = event.target.result;
    if (navigator.onLine) {
       addToDatabase()
    }
}

function saveRecord(singleTransaction) {
    let transaction = db.transaction(["pending"], "readwrite")
    let store = transaction.objectStore("pending")
    store.add(singleTransaction)
}

function addToDatabase() {
    let transaction = db.transaction(["pending"], "readwrite")
        let store = transaction.objectStore("pending")
        let allTransaction = store.getAll()
        allTransaction.onsuccess = () => {
            if (allTransaction.result.length > 0) {
                fetch("/api/transaction/bulk", {
                    method: "POST",
                    body: JSON.stringify(allTransaction.result), 
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json"
                    }
                }).then(response => {
                    return response.json()
                }).then (() => {
                    let transaction = db.transaction(["pending"], "readwrite");
                    let store = transaction.objectStore("pending");
                    store.clear()
                })
                    
            }
        }
}
window.addEventListener("online", addToDatabase)