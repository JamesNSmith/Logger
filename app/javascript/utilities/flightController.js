import Database from './indexedDB'

class FlightController {
  constructor(tag=null){
  	//this.database = new Database('flightLogger');

  	//var keys = ['cable','table','logger']
    if(!FlightController.dependents){
      FlightController.dependents = {};
    }

    if(tag){
      FlightController.dependents[tag[0]] = tag[1];
    }

    console.log('controller');
    console.log(FlightController.dependents);

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
  	var database = FlightController.dependents['database']
  	var table = FlightController.dependents['table']
  	var cable = FlightController.dependents['cable']

  	var databaseGet = function(data){
    	console.log('exit get range:',data)
    	table.addDataTable(data)
  	}

  	database.getRecordAll('flights',databaseGet);
  	//cable.ready()
  }

  delete(){
  	console.log('delete')
  	delete FlightController.dependents
  }
}

export default FlightController