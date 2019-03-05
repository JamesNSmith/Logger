class FlightChannel < ApplicationCable::Channel
  def subscribed
    stream_from "flight_channel"
  end

  def receive(data)
  	puts('receive ------------------------')
  	if data
  		puts('receive data ---------------------')
  		puts(data)
  		puts(data["flights"])
  	end
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
