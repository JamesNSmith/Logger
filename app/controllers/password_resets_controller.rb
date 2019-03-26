class PasswordResetsController < ApplicationController
  def new
  end

  def create
  	user = User.find_by_email(params[:email])
  	user.send_password_reset if user
  	redirect_to '/', :notice => "Email sent with password reset instructions."
  end

  def edit
  	@user = User.find_by_password_reset_token!(params[:id])
  end

  def update
  	@user = User.find_by_password_reset_token!(params[:id])
  	puts 'start'
  	puts params
  	puts params[:user]
  	puts params[:password]
  	puts params[:password_confirmation]

  	if @user.password_reset_sent_at < 2.hours.ago
  		redirect_to new_password_reset_path, :alert => "Password reset has expireed."
  	elsif @user.update_attributes(user_params) ##:password => params[:password], :password_confirmation => params[:password_confirmation]
  		redirect_to '/', :notice => "Password has been reset!"
  	else
  		render :edit
  	end
  end

  private
  def user_params
    params.require(:user).permit(:password,:password_confirmation)
  end
end
