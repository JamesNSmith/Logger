import React from "react"
import PropTypes from "prop-types"
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'

//import idb from 'idb';
//import { openDb, deleteDb } from 'idb';
//openDb();
//deleteDb();

import TableLog from './TableLog'
import Logger from './Logger'

//IndexedDB ---------------------------------

class Database {
  constructor(dbName,data){
    this.start = this.start.bind(this);

    this.dbName = dbName;
    this.version = 1;
    
    this.start();
  }

  start(){
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB');
      return;
    }

    var openRequest = indexedDB.open(this.dbName, this.version);

    openRequest.onupgradeneeded = function(e) {
      var db = e.target.result;
      console.log('running onupgradeneeded');
      if (!db.objectStoreNames.contains('flights')) {
        var flightsOS = db.createObjectStore('flights', {keyPath: 'flightNumber', autoIncrement: true});
      }
    };

    openRequest.onsuccess = function(e) {
      console.log('running onsuccess 1');

      var db = e.target.result;
      db.close();
    };

    openRequest.onerror = function(e) {
      console.log('onerror! start');
      
      var db = e.target.result;
      db.close();
    }; 
  }

  addData(table,data) {
    //var flights = {};
    var openRequest = indexedDB.open(this.dbName, this.version);

    openRequest.onsuccess = function(e) {
      console.log('running onsuccess 2');

      var db = e.target.result;
      var transaction = db.transaction([table], 'readwrite');
      var flights = transaction.objectStore(table);

      var request = flights.add(data);
      request.onsuccess = function(ev) {
        console.log('Woot! Did it -add');
        var db = e.target.result;
        db.close();
      };
      request.onerror = function(ev) {
        console.log('Error', e.target.error.name);
        var db = e.target.result;
        db.close();
      };
    }

    openRequest.onerror = function(e) {
      console.log('onerror! add');

      var db = e.target.result;
      db.close();
    };
  }

  updateRecord(table,id,data){
    var openRequest = indexedDB.open(this.dbName, this.version);

    openRequest.onsuccess = function(e) {
      console.log('running onsuccess 3');
      //var returnData
      var db = e.target.result;
      var transaction = db.transaction([table], 'readwrite');
      var flights = transaction.objectStore(table);

      var request = flights.get(id);
      request.onsuccess = function(ev) {
        console.log('Woot! Did it -update');

        var record = request.result;
        record[0][Object.keys(data)[0]] = Object.values(data)[0]

        //console.log('rec');
        //console.log(record);

        var requestUpdate = flights.put(record);
        requestUpdate.onsuccess = function(event){
          var db = e.target.result;
          db.close();

          //successHandler(request.result);
        }

        requestUpdate.onerror = function(event){
          var db = e.target.result;
          db.close();

          //fail
        }

      };
      request.onerror = function(ev) {
        console.log('Error', ev.target.error.name);
        var db = e.target.result;
        db.close();
      };   
    }

    openRequest.onerror = function(e) {
      console.log('onerror! get');
      console.dir(e);

      var db = e.target.result;
      db.close();
    };
  }

  getRecord(table,id,successHandler) {
    var openRequest = indexedDB.open(this.dbName, this.version);

    openRequest.onsuccess = function(e) {
      console.log('running onsuccess 2');
      //var returnData
      var db = e.target.result;
      var transaction = db.transaction([table], 'readwrite');
      var flights = transaction.objectStore(table);

      var request = flights.get(id);
      request.onsuccess = function(ev) {
        console.log('Woot! Did it -get');
        var db = e.target.result;
        db.close();

        successHandler(request.result);
      };
      request.onerror = function(ev) {
        console.log('Error', ev.target.error.name);
        var db = e.target.result;
        db.close();

        //fail
      };   
    }

    openRequest.onerror = function(e) {
      console.log('onerror! get');
      console.dir(e);

      var db = e.target.result;
      db.close();
    };
  }

  getRecordRange(table,range){
    var openRequest = indexedDB.open(this.dbName, this.version);

    openRequest.onsuccess = function(e) {
      console.log('running onsuccess 2');
      //var returnData
      var db = e.target.result;
      var transaction = db.transaction([table], 'readwrite');
      var flights = transaction.objectStore(table);

      var boundKeyRange = IDBKeyRange.bound(1,2, true, true);
      var request = index.openCursor(boundKeyRange);
      request.onsuccess = function(ev){
        var cursor = event.target.result;
        console.log(cursor)

        if (cursor) {
          // Do something with the matches.
          cursor.continue();
        }
      }

    }

    openRequest.onerror = function(e) {
      console.log('onerror! getRange');
      console.dir(e);

      var db = e.target.result;
      db.close();
    };
  }
}

    

class FlightLogger extends React.Component {
  constructor(props){
  	super(props);
	this.functions = [];
	//this.addDataRow = {};

	//this.componentDidMount = this.componentDidMount.bind(this);
	this.update = this.update.bind(this);

  	const keys = [
				'tailNumber',
				'acName',
				'p1FName',
				'p1LName',
				'p2FName',
				'p2LName',
				'lFee',
				'sFee'
			]
  	
  }
  
// Utils -------------------------------------

  update(newData){
  	console.log('update');
  	console.log(newData)
  	this.addDataRow(newData)
  }

//render --------------------------------------
  render() {
    return (
      <React.Fragment>
        <Logger update={this.update}/>
        <br />
        <TableLog getFunctions={this.functions}/>
      </React.Fragment>
    );
  }
	componentDidMount(){
	console.log('flight did mount')
	console.log(this.functions)
	this.addDataRow = this.functions[0]

  const start = [{
      flightNumber:'1',
      tailNumber:'YUG',
      acName:'Puchacz',
      p1FName:'John',
      p1LName:'Smith',
      p2FName:'Jack',
      p2LName:'Bing',
      lFee:'4.50',
      sFee:'0.15'
      },{
      flightNumber:'2',
      tailNumber:'TUG',
      acName:'Puchacz',
      p1FName:'Jack',
      p1LName:'Smith',
      p2FName:'Jack',
      p2LName:'Bing',
      lFee:'4.50',
      sFee:'0.15'
      }]
  const database = new Database('flightLogger');
  database.addData('flights',[start[0]]);
  database.addData('flights',[start[1]]);
 
  database.updateRecord('flights',1,{lFee:'5.00'});
  //delete

  var handler = function(data){
    console.log('exit')
    console.log(data)
  }
  database.getRecord('flights',1,handler)
  
  }

}

FlightLogger.propTypes = {
  greeting: PropTypes.string
};

export default FlightLogger
