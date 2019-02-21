class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user, :current_club  

  #User ------------------------------------
  def current_user 
    puts 'User'
    puts session[:user_id]
    puts session[:user_id].class
  	@current_user ||= User.find(session[:user_id]) if session[:user_id] 
  end
  
  def require_user 
  	redirect_to '/login' unless current_user 
  end

  #Club ------------------------------------
  def current_club 
    puts 'club'
    puts session[:club_id]
    puts session[:club_id].class
  	@current_club ||= Club.find(session[:club_id]) if session[:club_id] 
  end
end
