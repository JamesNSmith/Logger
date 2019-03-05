App.flights = App.cable.subscriptions.create "FlightsChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
  	alert 'hi'
  	#console.log "cable.sub"
    #console.log data.flights

$(document).on 'turbolinks:load', ->
  alert 'hello, world!'
