class CreateMemberships < ActiveRecord::Migration[5.1]
  def change
    create_table :memberships do |t|
      #t.belongs_to :club, index:true
      t.string :name
      t.boolean :mtype
      t.decimal :launch_price, precision:6, scale:2 

      t.timestamps
    end
  end
end
