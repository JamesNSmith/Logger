import Database from './indexedDB'

class FlightController {
  constructor(tag=null){

    window.flightController = this;
    window.flightControllerDependents = {};
    this.table = 'flights'
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
  updateRequest(request,columnValue){
    for(var key in columnValue){
      request[columnValue[key][0]] = columnValue[key][1]
    }
    return request
  }

//Table main ------------------------
  tableAddRecordDatabase(record,success,failure){
    var cable = window.flightControllerDependents['cable']

    var failureHandler = (error) => {
      console.log('tableAddRecordDatabase error')
      console.log(error)
      failure()
    }
    var databaseAdd = (response) => {
      console.log('cableAdd')
      console.log(response)
      success(response)
    }

    console.log(record)
    cable.add('flightInsert',record,databaseAdd,failureHandler)
  }

  tableUpdateFigures(table,id,success,failure){// time requires improvement!!!
    var database = window.flightControllerDependents['database'];
    var record = {}

    var failureHandler = (error) => {
      console.log('tableUpdateFigures error')
      console.log(error)
      failure()
    }
      
    var updateHandler = (response) => {
      success(record)
    }
    var recordHandler = (request) => {
      console.log(request)
      var launchFee = request['launchFee']
      var soaringFee = request['soaringFee']

      var launchTime =  new Date(request['launchTime'])
      var landTime =  new Date(request['landTime'])
      var flightTime = Math.floor(Math.abs((landTime.getTime() - launchTime.getTime()))/(1000*60))
      console.log('flightTime: ' + flightTime)
      console.log(launchTime)
      console.log(landTime)
      console.log(launchTime.getTime())
      console.log(landTime.getTime())
      
      var soaringTotal = flightTime * soaringFee
      var total = parseFloat(launchFee) + soaringTotal

      var returnVals = [['flightTime',flightTime],['soaringTotal',soaringTotal],['total',total]]

      record = this.updateRequest(request,returnVals)

      database.updateRecord(table,id,returnVals,updateHandler,failureHandler)
    }

    database.getRecord(table,id,recordHandler,failureHandler)
  }

  tableUpdate(table,id,columnValue,success,failure){
    var database = window.flightControllerDependents['database'];
    console.log('tableUpdate')
    console.log(columnValue)

    var errorHandler = (error) => {
      console.log('error')
      console.log(error)
      failure(error)
    }
    var updateHandler = (response) => {
      console.log('time success')
      console.log(response)
      success()

    }

    database.updateRecord(table,id,columnValue,updateHandler,errorHandler)
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