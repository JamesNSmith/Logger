class Club < ApplicationRecord
	has_many :club_users
	has_many :users, through: :club_users
	#has_many :memberships

	has_many :club_memberships
	has_many :memberships, through: :club_memberships

	has_many :club_aircrafts
	has_many :aircrafts, through: :club_aircrafts

	#has_many :flights
end
