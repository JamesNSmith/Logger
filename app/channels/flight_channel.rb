class FlightChannel < ApplicationCable::Channel
  def subscribed
    stream_from "flight_channel"
  end

  def receive(data)
  	puts('receive ------------------------')
  	if data["handshake"]
  		puts(data["handshake"])
  	end

    if data["title"] == 'get'
      @flights = Flight.all
      puts(@flights)
      ActionCable.server.broadcast 'flight_channel', id:data["id"], title:'get', content:@flights
    end
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
