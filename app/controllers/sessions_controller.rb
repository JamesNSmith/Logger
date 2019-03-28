class SessionsController < ApplicationController
  @@status = ''

  def new
    @status = @@status
  end

  def create 
    @user = User.find_by_email(params[:session][:email]) 
    if @user && @user.authenticate(params[:session][:password])
      if user.email_confirmed
        session[:user_id] = @user.id
        @club = @user.clubs
        if @club 
          session[:club_id] = (@club.first)['id'] #dodgy
        end 

      else
        flash.now[:error] = 'Please activate your account by following the instructions in the account confirmation email you received to proceed'
        render '/'
      end
     
      @@status = ''
      redirect_to '/' 
    else 
      @@status = "error"
      flash.now[:error] = 'Invalid email/password combination' # Not quite right!
      redirect_to '/login' 
    end
	end

	def destroy 
  	session[:user_id] = nil
    session[:club_id] = nil  
  	redirect_to '/' 
	end
end
