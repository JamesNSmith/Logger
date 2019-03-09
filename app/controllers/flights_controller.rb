class FlightsController < ApplicationController
	def index
		puts("index --------------")
      	@flight_dates = Flight.select(:launch_date).distinct.order(:launch_date)
	end

	def show
		puts("show --------------")
		@date = params[:launch_date]
		@date_flights = Flight.where(launch_date: @date ).order(:launch_date)
	end

	def logger
		@flights = Flight.all
		puts("logger --------------")
		#puts(Time.current)
		#ActionCable.server.broadcast 'flight_channel', flights: @flights
	end
end
