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

	database.countRecords('flights',function(result){ //---------------------------------
		index = result+1
		inputData['indexNumber'] = index
		inputData['flightNumber'] = null
		console.log(inputData)
		table.addDataTable(inputData)
		database.addData('flights',[inputData]) //---------------------------------
	});

  }

//Table ------------------------
  getFromTable(table,index,successHandler,failureHandler){
    

  }

  tableUpdateFigures(table,id,success,failure){
    var failureHandler = (error) => {
      console.log('error')
      console.log(error)
      failure()
    }
    var successHandler = (request) => {
      console.log(request)
      var launchFee = request['launchFee']
      var soaringFee = request['launchFee']

      var launchTime =  new Date(request['launchTime'])
      var landTime =  new Date(request['landTime'])
      var differenceVal = landTime.getTime() - launchTime.getTime()
      console.log(differenceVal)
      var difference = new Date(differenceVal)
      console.log(difference)
      console.log(difference.toISOString())
      
      //var flightTime = difference.getMinutes() + difference.getHours()*60
      //var soaringCharge = flightTime * soaringFee


      
      success()
    }

    var database = window.flightControllerDependents['database'];
    database.getRecord(table,id,successHandler,failureHandler)
  }

  tableUpdateTime(table,id,column,time,success,failure){
    var errorHandler = (error) => {
      console.log('error')
      console.log(error)
      failure(error)
    }
    var timeHandler = (response) => {
      console.log('time success')
      console.log(response)
      success()

    }

    var database = window.flightControllerDependents['database'];
    database.updateRecord(table,id,column,time,timeHandler,errorHandler)
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