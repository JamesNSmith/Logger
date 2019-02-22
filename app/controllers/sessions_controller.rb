class SessionsController < ApplicationController
  @@status = ''

  def new
    @status = @@status
  end

  def create 
    @user = User.find_by_email(params[:session][:email]) 
    if @user && @user.authenticate(params[:session][:password]) 
      session[:user_id] = @user.id
      #session[:expires] = 1.hour
      @@status = ''
      redirect_to '/' 
    else 
      @@status = "error"
      redirect_to '/login' 
    end
	end

	def destroy 
  	session[:user_id] = nil
    session[:club_id] = nil  
  	redirect_to '/' 
	end
end
