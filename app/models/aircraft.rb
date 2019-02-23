class Aircraft < ApplicationRecord
	has_many :club_aircrafts
	has_many :clubs, through: :club_aircrafts

	has_many :user_aircrafts
	has_many :users, through: :users_aircrafts

	has_many :flights
end
