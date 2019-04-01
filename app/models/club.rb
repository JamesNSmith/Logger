class Club < ApplicationRecord
	before_create {generate_token(:auth_token)}
	before_create {generate_token(:link_token)}

	has_many :club_users
	has_many :users, through: :club_users
	#has_many :memberships

	has_many :club_memberships
	has_many :memberships, through: :club_memberships

	has_many :club_aircrafts
	has_many :aircrafts, through: :club_aircrafts

	has_many :flights

	#def email_link
    #	self.email_confirmed = true
    #	self.email_confirm_token = nil
    #	save!(:validate => false)
  	#end

  	private
	def generate_token(column)
    	begin
      		self[column] = SecureRandom.urlsafe_base64
   		end while Club.exists?(column => self[column])
  	end
end
