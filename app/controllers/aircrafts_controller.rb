class AircraftsController < ApplicationController
	def index
	  @aircrafts = Aircraft.all
	end

	def showclub
	  if current_club
      @aircrafts = current_club.aircrafts
    end
  end

  def showuser
    if current_user
      @aircrafts = current_user.aircrafts
    end
  end

  def new
    case request.method_symbol
    when :get
  	  @aircraft = Aircraft.new
    when :post
      @aircraft = Aircraft.new(aircraft_params)
      puts params[:owner]
      #@membership.club << current_club
      if @aircraft.save
        if params[:owner] == 'club' && current_club
          current_club.aircrafts << [@aircraft]
        elsif params[:owner] == 'user' && current_user
          current_user.aircrafts << [@aircraft]
        end
        redirect_to '/'
      else
        redirect_to '/aircraft/add'
      end
    end
  end

  private
  def aircraft_params
    params.require(:aircraft).permit(:tail_number, :name, :actype)
  end
end
