import Database from './indexedDB'

class FlightController {
  constructor(tag=null){

    window.flightController = this;
    window.flightControllerDependents = {};

    this.table = 'flights'
    this.mode = ''
  }

//Logger ---------
  addFromLogger(inputData){
    console.log('addFromLogger')

    var database = window.flightControllerDependents['database']
    var table = window.flightControllerDependents['table']
    var addDataTable = database.addDataTable
    var index

    console.log('inputData:')
    console.log(inputData)

    var countHandler = (result) => {
      index = result+1
      inputData['indexNumber'] = index
      inputData['flightNumber'] = null
      console.log('inpData')
      console.log(inputData)
      table.addDataTable([inputData])
      database.addData('flights',[inputData]) //---------------------------------
    }
  	
	  database.countRecords('flights',countHandler);

  }

//Table helpers ------------------------
  populateObject(object,columnValue){
    for(var key in columnValue){
      console.log(columnValue[key])
      object[columnValue[key][0]] = columnValue[key][1]
    }
   
    return object
  }

  calculateTimeFees (record) {
    console.log(record)
    var launchFee = record['launchFee']
    var soaringFee = record['soaringFee']

    var launchTime =  new Date(record['launchTime'])
    var landTime =  new Date(record['landTime'])
    var flightTime = Math.floor(Math.abs((landTime.getTime() - launchTime.getTime()))/(1000*60))
    console.log('flightTime: ' + flightTime)

    var soaringTotal = parseFloat(flightTime * soaringFee).toFixed(2)
    var total = parseFloat(launchFee) + parseFloat(soaringTotal)

    var returnVals = [['flightTime',flightTime],['soaringTotal',soaringTotal],['total',total]]

    return {record,returnVals}
  }

//table handlers -----------------------

  tableProcessDatabaseData(returnData,resolve,reject) {
    console.log('processDatabaseData')
    console.log(returnData)

    if(returnData['error'] == null){
      resolve([['flightNumber',returnData['flightNumber']]])
    } else {
      reject(returnData['error'])
    }

  }

  tableUpdateTime(indexTable,id,name,time){
    var database = window.flightControllerDependents['database'];
    var table = window.flightControllerDependents['table']
    var cable = window.flightControllerDependents['cable']
    
    console.log('tableUpdate')
    console.log(table)

    var timeUpdatedRecord = {}
    var timeUpdatedValues = []
    var databaseIndex = []

    var queue = new Promise((resolve,reject) => {
      database.updateRecord(indexTable,id,[[name,time]],resolve,reject)

    }).then(() => {
      return new Promise((resolve,reject) => {table.updateCheckStatus(id,name,resolve,reject)})

    }).then((status) => {
      return new Promise((resolve,reject) => {if(status){resolve()} else {console.log('exit due time')}})

    }).then(() => {
      return new Promise((resolve,reject) => {database.getRecord(indexTable,id,resolve,reject)})

    }).then((record) => {
      return this.calculateTimeFees(record)

    }).then(({record,returnVals}) => {
      timeUpdatedRecord = this.populateObject(record,returnVals)
      timeUpdatedValues = returnVals

    }).then(() => {
      return new Promise((resolve,reject) => {database.updateRecord(indexTable,id,timeUpdatedValues,resolve,reject)})

    }).then((index) => {
      return new Promise((resolve,reject) => {table.updateTableData(id,timeUpdatedValues,resolve,reject)})

    }).then((status) => {
      return new Promise((resolve,reject) => {if(this.mode == 'demo'){console.log('exit due mode')} else {resolve()}})

    }).then(() => {
      return new Promise((resolve,reject) => {cable.add('flightInsert',timeUpdatedRecord,resolve,reject)})

    }).then((response) => {
      return new Promise((resolve,reject) => {this.tableProcessDatabaseData(response,resolve,reject)})

    }).then((returnVals) => {
      databaseIndex = returnVals

    }).then(() => {
      return new Promise((resolve,reject) => {database.updateRecord(indexTable,id,databaseIndex,resolve,reject)})

    }).then((index) => {
      return new Promise((resolve,reject) => {table.updateTableData(id,databaseIndex,resolve,reject)})

    }).catch((error) => {
      console.log('tableUpdateTime queue failed:')
      console.log(error)

    })
  }

//this ---------------------------------
  ready(){
  	var database = window.flightControllerDependents['database']
  	var table = window.flightControllerDependents['table']
  	var cable = window.flightControllerDependents['cable']

  	var databaseGet = function(data){
    	console.log('exit get range:',data)
    	table.addDataTable(data)
  	}

  	database.getRecordAll('flights',databaseGet);

  	var cableGet = function(data){
  		console.log('cableGet')
  		console.log(data)
  		database.addData('flights',data,databaseGet)
  		//table.addDataTable(data)
  	}

  	var queue = new Promise((resolve,reject) => {cable.ready(resolve,reject)})
    .then(() => {cable.get('all',cableGet)})

  	//cable.ready()
  	//cable.get('all',cableGet)
  }

  delete(){
  	console.log('delete')
  	//delete FlightController.dependents
  	delete  window.flightControllerDependents
  }
}

export default FlightController