class CreateClubAircrafts < ActiveRecord::Migration[5.1]
  def change
    create_table :club_aircrafts do |t|
      t.belongs_to :club
      t.belongs_to :aircraft

      t.timestamps
    end
  end
end
