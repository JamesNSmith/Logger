class FlightsController < ApplicationController
	def index
		@flights = Flight.all
		
		puts('flights----------------------------')
		puts(@flights)
		@flights.each do |flight|
			puts(flight)
		end

		ActionCable.server.broadcast 'flights_channel', flight:'hi'
	end
end
