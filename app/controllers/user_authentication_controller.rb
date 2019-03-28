class UserAuthenticationController < ApplicationController
  def show
  	@user = User.find_by_email_confirm_token!(params[:id])
    if @user
      @user.email_activate
      flash.now[:success] = "Welcome to FlightLogger! Your email has been confirmed.
      Please sign in to continue."
      #session[:user_id] = @user.id #not sure
      #redirect_to '/'
      redirect_to '/login' 
    else
      flash.now[:danger] = "Sorry. User does not exist"
      redirect_to '/'
    end
  end
end
