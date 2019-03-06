import React from "react"
import actionCable from 'actioncable'

import FlightController from '../utilities/flightController'



class Cable extends React.Component {
	constructor(props){
		super(props);
		this.cableApp = {}
		this.flight = ''
		//this.cableApp.cable = actionCable.createConsumer('/cable')
		console.log(this.cableApp)
	}

	message(){
		console.log('Cable')
	}

	render(){
		return (
			<div id="cable"></div>
		);
	}

	componentDidMount(){
		console.log(this.cableApp)
		/*this.flight = this.cableApp.cable.subscriptions.create("FlightChannel", {
			connected: () => {
    			//Called when the subscription is ready for use on the server
    			console.log('connected react')
  			},
      		received: (data) => {
        	console.log(data)
        	console.log('hi from react channel')
      		}
    	})*/

		console.log(this.cableApp)
		//this.controller = new Controller(['cable',this])
	}
}

export default Cable