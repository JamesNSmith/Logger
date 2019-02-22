class ClubUser < ApplicationRecord
	belongs_to :user
	belongs_to :membership
	belongs_to :club
end
