class Controller {
  constructor(tag=null){
  	var keys = ['cable','table','log']
    if(!Controller.update){
      Controller.update = [];
    }

    if(tag){
      Controller.update[tag[0]] = tag[1];
    }

    console.log('controller');
    console.log(Controller.update);

    for(var count=0;count<3;count++){
    	if(Controller.update[keys[count-1]]){
    		Controller.update[keys[count-1]].message();
    	}
    }
  }
}

export default Controller