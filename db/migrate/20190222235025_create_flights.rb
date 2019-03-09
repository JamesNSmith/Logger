class CreateFlights < ActiveRecord::Migration[5.1]
  def change
    create_table :flights do |t|
      t.belongs_to :user
      t.belongs_to :club
      t.string :takeoff_type
      t.belongs_to :aircraft

      t.belongs_to :club_user_p1
      t.belongs_to :club_user_p2

      t.date :launch_date
      t.time :launch_time
      t.time :land_time
      t.integer :flight_time #minutes

      t.decimal :launch_fee, precision:6, scale:2 
      t.decimal :soaring_fee, precision:6, scale:2 
      t.decimal :soaring_total, precision:6, scale:2 
      t.decimal :total, precision:6, scale:2 

      t.timestamps
    end
  end
end
