class FlightsController < ApplicationController
	def index
		puts("index --------------")
      	@flight_dates = Flight.select(:launch_date).distinct.order(launch_date: :desc)
	end

	def show
		puts("show --------------")
		@date = params[:launch_date]
		@date_flights = Flight.where(launch_date: @date ).order(launch_time: :desc)
	end

	def logger
		@user = current_user()
		@club = current_club()
		@memberships = @club.memberships
		puts @memberships
		@flights = Flight.all
		puts("logger --------------")
		



		
		#ActionCable.server.broadcast 'flight_channel', flights: @flights
	end
end
