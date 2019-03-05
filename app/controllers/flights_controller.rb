class FlightsController < ApplicationController
	def index
		@flights = Flight.all
		puts("flights --------------")
		@flights.each do |flight|
			puts(flight.id)
			puts(flight.launch_fee)
		end
	end
end
