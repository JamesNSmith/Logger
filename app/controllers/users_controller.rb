class UsersController < ApplicationController
	def index
    case request.method_symbol
    when :get
      @users = User.all
    when :post
      @user = User.find_by_id(params[:user][:id]) 
      if @user
        session[:user_id] = @user.id
        @clubs = @user.clubs
        if @clubs[0]
          session[:club_id] = @clubs[0].id   #----------dodgy---------------
        else
          session[:club_id] = nil
        end
        redirect_to '/' 
      end
    end
  end

  def new 
		@user = User.new
	end

	def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to '/'
    else
      redirect_to '/signup'
    end
  end
  
  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password,:password_confirmation)
  end
end
