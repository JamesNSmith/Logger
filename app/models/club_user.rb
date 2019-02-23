class ClubUser < ApplicationRecord
	belongs_to :user
	belongs_to :membership
	belongs_to :club

	has_many :flights
end
