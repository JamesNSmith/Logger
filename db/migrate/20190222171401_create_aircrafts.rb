class CreateAircrafts < ActiveRecord::Migration[5.1]
  def change
    create_table :aircrafts do |t|
      t.string :registration
      t.string :name
      t.string :actype #glider, motorised, tug?

      t.timestamps
    end
  end
end
