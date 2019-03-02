/*
    var request = indexedDB.open(dbName, 1)
    request.onerror = function(event) {
      //alert("Why didn't you allow my web app to use IndexedDB?!");
      alert("Database error: " + event.target.errorCode);
    };
    request.onupgradeneeded = function(event) {
      db = event.target.result;

      var objectStore = db.createObjectStore('flights', {keyPath: 'flightNumber', autoIncrement: true});
      objectStore.createIndex('tailNumber', 'tailNumber', {unique: false});
      objectStore.createIndex('acName', 'acName', {unique: false});
      objectStore.createIndex('p1FName', 'p1FName', {unique: false});
      objectStore.createIndex('p1LName', 'p1LName', {unique: false});
      objectStore.createIndex('p2FName', 'p2FName', {unique: false});
      objectStore.createIndex('p2LName', 'p2LName', {unique: false});
      objectStore.createIndex('lFee', 'lFee', {unique: false});
      objectStore.createIndex('sFee', 'sFee', {unique: false});

      objectStore.transaction.oncomplete = function(event) {
        var flightsObjectStore = db.transaction("flights", "readwrite").objectStore("flights");
        flightsData.forEach(function(customer) {
          flightsObjectStore.add(flights);
        });
      };

    };
    /*
      if (!upgradeDb.objectStoreNames.contains('flights')) {
        var flightsOS = upgradeDb.createObjectStore('flights', {keyPath: 'flightNumber', autoIncrement: true});
        flightsOS.createIndex('tailNumber', 'tailNumber', {unique: false});
        flightsOS.createIndex('acName', 'acName', {unique: false});
        flightsOS.createIndex('p1FName', 'p1FName', {unique: false});
        flightsOS.createIndex('p1LName', 'p1LName', {unique: false});
        flightsOS.createIndex('p2FName', 'p2FName', {unique: false});
        flightsOS.createIndex('p2LName', 'p2LName', {unique: false});
        flightsOS.createIndex('lFee', 'lFee', {unique: false});
        flightsOS.createIndex('sFee', 'sFee', {unique: false});
      }
    });

    //var dbP = dbPromise
    console.log(dbPromise)
    dbPromise.then(function(db){
      var tx = db.transaction('store', 'readwrite');
      var store = tx.objectStore('store');
      store.add(data);
      return tx.complete;

    }).then(function() {
      console.log('added item to the store os!');
    });
    */
    /*
    var transaction = db.transaction(["flights"], "readwrite");

    transaction.oncomplete = function(event) {
      alert("All done!");
    };

    transaction.onerror = function(event) {
      // Don't forget to handle errors!
    };

    var objectStore = transaction.objectStore("customers");
    customerData.forEach(function(customer) {
      var request = objectStore.add(customer);
      request.onsuccess = function(event) {
        // event.target.result === customer.ssn;
      };
    });
    */
  
/*
  add(data){
    const dbP = this.dbPromise
    console.log(dbP)
    dbP.then(function(db){
      var tx = db.transaction('store', 'readwrite');
      var store = tx.objectStore('store');
      store.add(data);
      return tx.complete;
    }).then(function() {
      console.log('added item to the store os!');
    });
  }   
}
*/