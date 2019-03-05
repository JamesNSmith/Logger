class CreateFlights < ActiveRecord::Migration[5.1]
  def change
    create_table :flights do |t|
      #t.belongs_to :club, index: true
      t.string :takeoff_type
      #t.belongs_to :aircraft

      #t.belongs_to :club_user, index: true
      #t.belongs_to :club_user_p2
      #, :references => 'club_user'
      #t.belongs_to :club_user_p2, :class_name => 'club_user', :foreign_key => 'club_user_p2_id'

      #t.date :launch
      #t.date :land
      #t.time :flight_time

      t.decimal :launch_fee, precision:6, scale:2 
      t.decimal :soaring_fee, precision:6, scale:2 
      t.decimal :soaring_total, precision:6, scale:2 
      t.decimal :total, precision:6, scale:2 

      t.timestamps
    end
  end
end
