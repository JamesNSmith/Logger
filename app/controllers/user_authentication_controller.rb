class UserAuthenticationController < ApplicationController
  def confirm_email
  	@user = User.find_by_confirm_token!(params[:id])
    if user
      @user.email_activate
      flash[:success] = "Welcome to the Sample App! Your email has been confirmed.
      Please sign in to continue."
      redirect_to 'login'
    else
      flash[:error] = "Sorry. User does not exist"
      redirect_to '/'
    end
  end
end
