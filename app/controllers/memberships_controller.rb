class MembershipsController < ApplicationController
	def index
	  @memberships = Membership.all
	end

	def show
	  if current_club
      @memberships = current_club.memberships
    end
  end

  def new
    case request.method_symbol
    when :get
  	  @membership = Membership.new
    when :post
      @membership = Membership.new(member_params)
      #@membership.club << current_club
      if @membership.save && current_club
      	current_club.memberships << [@membership]
        redirect_to '/'
      else
        redirect_to '/membership/add'
      end
    end
  end

  private
  def member_params
    params.require(:membership).permit(:name, :mtype, :launch_price, :soaring_price)
  end
end
