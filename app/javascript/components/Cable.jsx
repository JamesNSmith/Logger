import React from "react"
import actionCable from 'actioncable'

import FlightController from '../utilities/flightController'



class Cable extends React.Component {
	constructor(props){
		super(props);
		this.cableApp = {}
		this.flight = ''
		this.query = {}
		this.queryCount = 0

		this.cableApp.cable = actionCable.createConsumer('/cable')
		console.log(this.cableApp)

		window.flightControllerDependents['cable'] = this
    	console.log(flightControllerDependents)
	}

//coms ----------------------------
	message(){
		console.log('Cable')
	}

//requests -------------------------=
	get(request,successHandler){//request
		var count = JSON.parse(JSON.stringify(this.queryCount))
		count.to_s

		this.query[count] = successHandler
		this.flight.send({title:'get',header:'all',id:count})
		this.queryCount += 1
		console.log(this.queryCount)
		
	
	}

//kicks ---------------------------------
	ready(successHandler,failureHandler){
		console.log('cable start')
		console.log(this.cableApp)

		this.flight = this.cableApp.cable.subscriptions.create("FlightChannel", {
			connected: () => {
    			//Called when the subscription is ready for use on the server
    			console.log('connected react')
    			if(confirm("press")){
    				console.log('yes')
    				this.flight.send({handshake: 'yes'})
    				successHandler()
    			} else {
    				console.log('no')
    				this.flight.send({handshake: 'no'})
    			}
  			},
      		received: (data) => {
        		console.log(data)
        		console.log('hi from react channel')

        		console.log(data["id"])

        		if(data["id"]!=null){
        			console.log('id')
        			console.log(data["id"])
        			this.query[data["id"]](data['content'])
        			//this.query[data["id"]](data['content'])
        		}

        		/*if(data["title"] == 'get'){
        			console.log('get')
        			var content = data["content"]
        		}*/
      		}
    	})

		console.log('sub')
    	console.log(this.cableApp.cable.subscriptions['subscriptions'])

    	if (this.cableApp.cable.subscriptions['subscriptions'].length > 1) {
    		this.cableApp.cable.subscriptions.remove(this.cableApp.cable.subscriptions['subscriptions'][1])
		};

		console.log('cable ready')
		console.log(this.cableApp)		
	}

//construct ------------------------------
	render(){
		return (
			<div id="cable"></div>
		);
	}

	componentDidMount(){
		
	}

	componentWillUnmount(){
		console.log(this.cableApp.cable.subscriptions)
		if(this.cableApp.cable.subscriptions['subscriptions'][0]){
			this.cableApp.cable.subscriptions.remove(this.cableApp.cable.subscriptions['subscriptions'][0])
		
		}
		console.log(this.cableApp.cable.subscriptions)
		this.cableApp.cable.subscriptions.consumer.disconnect();
		console.log(this.cableApp.cable.subscriptions)
	}
}

export default Cable