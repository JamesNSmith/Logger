import React from "react"
import actionCable from 'actioncable'

import FlightController from '../utilities/flightController'



class Cable extends React.Component {
	constructor(props){
		super(props);
		this.cableApp = {}
		this.flight = ''
		this.cableApp.cable = actionCable.createConsumer('/cable')
		console.log(this.cableApp)
	}

//coms ----------------------------
	message(){
		console.log('Cable')
	}

//kicks ---------------------------------
	ready(){
		console.log('cable start')
		console.log(this.cableApp)

		this.flight = this.cableApp.cable.subscriptions.create("FlightChannel", {
			connected: () => {
    			//Called when the subscription is ready for use on the server
    			console.log('connected react')
  			}
  			,
      		received: (data) => {
        	console.log(data)
        	console.log('hi from react channel')
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
		//this.controller = new FlightController(['cable',this])
	}

	componentWillUnmount(){
		console.log(this.cableApp.cable.subscriptions)
		//if(this.cableApp.cable.subscriptions['subscriptions'][0]){
			//delete this.cableApp.cable.subscriptions['subscriptions'][0]
		
		//}
		console.log(this.cableApp.cable.subscriptions)
	}
}

export default Cable