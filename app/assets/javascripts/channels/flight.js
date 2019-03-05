//import Controller from '../../../javascript/utilities/indexedDB'

App.flight = App.cable.subscriptions.create("FlightChannel",{ 
  connected: function() {
    //Called when the subscription is ready for use on the server
  },
  disconnected: function(){
    //Called when the subscription has been terminated by the server
  },

  received: function(data){
    //alert 'hi'
    console.log(data)
    console.log('hi from channel')

    if(confirm("press")){
    	console.log('yes')
    	App.flight.send({flights: 'yes'})
    } else {
    	console.log('no')
    	App.flight.send({flights: 'no'})
    }
  }
})



