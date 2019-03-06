import flights from './seeds'
import FlightController from './flightController'

/*
class Flights extends Database {
	static constructor(){
		super('flightLogger')

	}
}
*/

class Database {
//Constructors -----------------------------
  constructor(dbName){
    this.start = this.start.bind(this);

    this.dbName = dbName;
    this.version = 1;
    this.count = 0;

    var flightController
    
    if (!('indexedDB' in window)) { //!window.indexedDB
      console.log('This browser doesn\'t support IndexedDB');
      return;
    }

    this.deleteDatabase(()=>{
      this.start();
    });
    
    this.addData('flights',flights,()=>{
      var flightController = new FlightController(['database',this])
    });

    this.flightController = flightController
    
    //this.flightController.ready()
  }

  start(){
    console.log('start')
  	
    var openRequest = indexedDB.open(this.dbName, this.version);

    console.log('start b')
    console.log(openRequest)
    openRequest.onupgradeneeded = function(e) { //upgrading the database version number??
      var db = e.target.result;
      console.log('running onupgradeneeded');

      if (!db.objectStoreNames.contains('flights')) {
        console.log('new flights')
        var flightsOS = db.createObjectStore('flights', {keyPath: 'id', autoIncrement: true});
        flightsOS.createIndex("indexNumber", "indexNumber", { unique: true });
        
      }
    };

    openRequest.onsuccess = function(e) {
      console.log('running onsuccess 1');

      e.target.result.close();
    };

    openRequest.onerror = function(e) {
      console.log('onerror! start');
      
      e.target.result.close();
    }; 

    console.log(openRequest)
  }
//coms -------------------------------------
  message(){
    console.log('database')
  }

// Count ---------------------
  countRecords(table,successHandler){ 
    var openRequest = indexedDB.open(this.dbName, this.version);

    openRequest.onsuccess = function(e) {
      var db = e.target.result;
      var transaction = db.transaction([table], 'readwrite');
      var records = transaction.objectStore(table);

      var request = records.count();
      request.onsuccess = function(ev) {
        successHandler(request.result);
        e.target.result.close();
      };
      request.onerror = function(ev) {
        console.log('Error', e.target.error.name);
        e.target.result.close();
      };
    }

    openRequest.onerror = function(e) {
      console.log('onerror! count');
      e.target.result.close();
    };
  }

  /*deleteTable(table) {
    var openRequest = indexedDB.open(this.dbName, this.version);

    openRequest.onsuccess = function(e) {
       console.log('running onsuccess delete');
       var db = e.target.result;
    -> db.deleteObjectStore(table);

    }

    openRequest.onerror = function(e) {
      console.log('onerror! delete table');

      var db = e.target.result;
      db.close();
    };
  }
  */
// Delete ------------------------
  deleteDatabase(successHandler){
    var deleteRequest = indexedDB.deleteDatabase(this.dbName);
    deleteRequest.onsuccess = function () {
      console.log("Deleted database successfully");
      successHandler()
    };
    deleteRequest.onerror = function () {
      console.log("Couldn't delete database");
    };
    deleteRequest.onblocked = function () {
      console.log("Couldn't delete database due to the operation being blocked");
    };
  }

  deleteData(table,id){
    var openRequest = indexedDB.open(this.dbName, this.version);

    openRequest.onsuccess = function(e) {
      console.log('running onsuccess delete');

      var db = e.target.result;
      var transaction = db.transaction([table], 'readwrite');
      var records = transaction.objectStore(table);

      var request = records.delete(id);
      request.onsuccess = function(ev) {
        console.log('Woot! Did it -delete');
        e.target.result.close();
      };
      request.onerror = function(ev) {
        console.log('Error', e.target.error.name);
        e.target.result.close();
      };
    }

    openRequest.onerror = function(e) {
      console.log('onerror! add');
      e.target.result.close();
    };
  }
//Add -------------------------
  addData(table,data,successHandler) {
    var openRequest = indexedDB.open(this.dbName, this.version);

    openRequest.onsuccess = function(e) {
      console.log('running onsuccess 2');

      var db = e.target.result;
      var transaction = db.transaction([table], 'readwrite');
      var records = transaction.objectStore(table);

      for(var count=0;count<data.length;){
      	var request = records.add(data[count]);
      	count++
      	request.onsuccess = function(ev) {
        	console.log('Woot! Did it -add');
          successHandler()

        	if(count == data.length){
        		e.target.result.close();
        	}
      	};
      	request.onerror = function(ev) {
        	console.log('Error', ev.target.error.name);
        	e.target.result.close();
      	};
 		
  	  }
    }

    openRequest.onerror = function(e) {
      console.log('onerror! add');
      e.target.result.close();
    };
  }
//Update -----------------
  updateRecord(table,id,data){
    var openRequest = indexedDB.open(this.dbName, this.version);

    openRequest.onsuccess = function(e) {
      console.log('running onsuccess 3');
      //var returnData
      var db = e.target.result;
      var transaction = db.transaction([table], 'readwrite');
      var records = transaction.objectStore(table);

      var request = records.get(id);
      console.dir(records)
      request.onsuccess = function(ev) {
        console.log('Woot! Did it -update');

        var record = request.result;
        console.log(request)
        console.log(record)
        record[Object.keys(data)[0]] = Object.values(data)[0]

        var requestUpdate = records.put(record);
        requestUpdate.onsuccess = function(event){
          e.target.result.close();

          //successHandler(request.result);
        }

        requestUpdate.onerror = function(event){
          e.target.result.close();

          //fail
        }

      };
      request.onerror = function(ev) {
        console.log('Error', ev.target.error.name);
        e.target.result.close();
      };   
    }

    openRequest.onerror = function(e) {
      console.log('onerror! get');
      console.dir(e);

      e.target.result.close();
    };
  }
//Get ----------------------------
  getRecord(table,id,successHandler) {
    var openRequest = indexedDB.open(this.dbName, this.version);

    openRequest.onsuccess = function(e) {
      console.log('running onsuccess 2');

      var db = e.target.result;
      var transaction = db.transaction([table], 'readwrite');
      var records = transaction.objectStore(table);

      var request = records.get(id);
      request.onsuccess = function(ev) {
        console.log('Woot! Did it -get');
        e.target.result.close();

        successHandler(request.result);
      };
      request.onerror = function(ev) {
        console.log('Error', ev.target.error.name);
        e.target.result.close();

        //fail
      };   
    }

    openRequest.onerror = function(e) {
      console.log('onerror! get');
      console.dir(e);

      e.target.result.close();
    };
  }

  getRecordRange(table,column,range,successHandler){ //Range:[lower,upper]
    var openRequest = indexedDB.open(this.dbName, this.version);

    openRequest.onsuccess = function(e) {
      console.log('running onsuccess 3');

      var db = e.target.result;
      var transaction = db.transaction([table], 'readwrite');
      var records = transaction.objectStore(table);
      var index = records.index(column);

      var boundKeyRange = IDBKeyRange.bound(range[0],range[1], false, false);
      var request = index.openCursor(boundKeyRange); //"prev"

      var data = []
      request.onsuccess = function(ev){
        var cursor = event.target.result;

        if (cursor) {
          data.push(cursor.value);
          cursor.continue();
        }
        else {
          e.target.result.close();
          successHandler(data);
        }
      }

      request.onerror = function(ev){
        console.log('onerror! getRecordRange request');
        console.dir(e);

        e.target.result.close();
      }   
    }

    openRequest.onerror = function(e) {
      console.log('onerror! getRecordRange');
      console.dir(e);

      e.target.result.close();
    };
  }

  getRecordAll(table,successHandler){
  	var openRequest = indexedDB.open(this.dbName, this.version);

    openRequest.onsuccess = function(e) {
      console.log('running onsuccess 2');

      var db = e.target.result;
      var transaction = db.transaction([table], 'readwrite');
      var records = transaction.objectStore(table);

      var request = records.getAll();
      request.onsuccess = function(ev) {
        console.log('Woot! Did it -getAll');
        e.target.result.close();

        successHandler(request.result);
      };
      request.onerror = function(ev) {
        console.log('Error', ev.target.error.name);
        e.target.result.close();

        //fail
      };   
    }

    openRequest.onerror = function(e) {
      console.log('onerror! get');
      console.dir(e);

      e.target.result.close();
    };
  }
}


export default Database
