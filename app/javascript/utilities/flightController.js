import Database from './indexedDB'

class FlightController {
  constructor(tag=null){
  	this.database = new Database('flightLogger');

  	var keys = ['cable','table','logger']
    if(!FlightController.update){
      FlightController.update = {};
    }

    if(tag){
      FlightController.update[tag[0]] = tag[1];
    }

    console.log('controller');
    console.log(FlightController.update);

    for(var key in FlightController.update){
    	console.log('key')
    	console.log(key)
    	if(FlightController.update[key]){
    		FlightController.update[key].message();
    	}
    }
  }

  addFromLogger(data){
  	console.log('addFromLogger')

  	var addDataTable = this.addDataTable
	var database = FlightController.database //-----------------------------------------------------

	console.log('inputData:')
	console.log(inputData)

	this.database.countRecords('flights',function(result){ //---------------------------------
		inputData['indexNumber'] = result+1
		console.log(inputData)
		addDataTable(inputData)
		database.addData('flights',[inputData]) //---------------------------------
	});



  }
}

export default FlightController