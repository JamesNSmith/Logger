import Database from './indexedDB'

class FlightController {
  constructor(tag=null){
  	//this.database = new Database('flightLogger');

  	//var keys = ['cable','table','logger']
    /*if(!FlightController.dependents){
      FlightController.dependents = {};
    }*/

    window.flightController = this;
    window.flightControllerDependents = {};

    console.log('aa')

    /*if(tag){
      FlightController.dependents[tag[0]] = null
      FlightController.dependents[tag[0]] = tag[1];
    }*/

    console.log('bb')

    console.log('controller');
    //console.log(window.flightControllerDependents);

    console.log('cc')
    /*for(var key in FlightController.dependents){
    	console.log('key')
    	console.log(key)
    	if(FlightController.dependents[key]){
    		FlightController.dependents[key].message();
    	}
    }*/
  }

//Logger ---------
  addFromLogger(inputData){
  	console.log('addFromLogger')

  	var database = FlightController.dependents['database']
  	var table = FlightController.dependents['table']
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

  tableReady(){
  	return FlightController.dependents['database'].getRecordAll('flights',getHandler);
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
  		database.addData('flights',[data])
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