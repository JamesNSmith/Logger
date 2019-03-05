class FlightsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "flights_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
