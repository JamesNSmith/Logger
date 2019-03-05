class CreateFlights < ActiveRecord::Migration[5.1]
  def change
    create_table :flights do |t|
      #t.belongs_to :club
      t.string :takeoff_type
      #t.belongs_to :aircraft

      #t.belongs_to :club_user
      #t.belongs_to :club_user_p1, :references => 'club_user'
      #t.belongs_to :club_user_p2, :references => 'club_user'
      #t.belongs_to :club_user_p2, :class_name => 'club_user', :foreign_key => 'club_user_p2_id'

      #t.date :launch
      #t.date :land
      #t.time :flight_time

      t.decimal :launch_fee
      t.decimal :soaring_fee
      t.decimal :soaring_total
      t.decimal :total

      t.timestamps
    end
  end
end
