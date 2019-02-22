class CreateUserAircrafts < ActiveRecord::Migration[5.1]
  def change
    create_table :user_aircrafts do |t|
      t.belongs_to :user
      t.belongs_to :aircraft

      t.timestamps
    end
  end
end
