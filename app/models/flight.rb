class Flight < ApplicationRecord
	belongs_to :user, optional: true
	belongs_to :club, optional: true
	belongs_to :aircraft, optional: true
	belongs_to :club_user_p1, :class_name => 'ClubUser', optional: true
	belongs_to :club_user_p2, :class_name => 'ClubUser', optional: true
end
