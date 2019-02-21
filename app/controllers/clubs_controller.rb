class ClubsController < ApplicationController
  def index
    case request.method_symbol
    when :get
      puts request.method_symbol
      @clubs = Club.all
    when :post
      puts params[:clubs][:id]
      @club = Club.find_by_id(params[:clubs][:id]) 
      if @club 
        session[:club_id] = @club.id
        redirect_to '/club/members' 
      end
    end
  end

  def show
    case request.method_symbol
    when :get
      if current_club
        @users = current_club.users
      end
    when :post
      #???
    end
  end

  def new
    case request.method_symbol
    when :get
  	 @club = Club.new
    when :post
      @club = Club.new(user_params)
      if @club.save
        session[:club_id] = @club.id
        redirect_to '/'
      else
        redirect_to '/addclub'
      end
    end
  end

  def destroy 
  	session[:club_id] = nil 
  	redirect_to '/' 
  end
  
  private
  def user_params
    params.require(:club).permit(:name, :initials, :country)
  end

end
