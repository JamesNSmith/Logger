class ClubLinkController < ApplicationController
  def new
  	puts params[:format]
  	@club = Club.find_by_link_token!(params[:format])
    if @club
      @user = User.find(session[:user_id])
      @membership = Membership.find(1)
      puts @clubMembership

      if @club.users.length == 0
      	@utype = 'admin'
      else
      	@utype = ''
      end

      @clubUser = ClubUser.new(user:@user,club:@club,membership:@membership,utype:@utype) ##,utype:'admin'

      if @clubUser.save 
      	session[:club_id] = @club.id
      	redirect_to '/', :success => "You have joined " + @club.name
      else
      	redirect_to '/', :danger => "Sorry. Club does not exist"
      end
      
    else
      redirect_to '/', :danger => "Sorry. Club does not exist"
    end
  end
end
