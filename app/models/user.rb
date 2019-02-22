class User < ApplicationRecord
	has_secure_password
	has_many :club_users
	has_many :clubs, through: :club_users
	has_many :memberships, through: :club_users
end
