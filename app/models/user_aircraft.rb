class UserAircraft < ApplicationRecord
	belongs_to :user
	belongs_to :aircraft
end
