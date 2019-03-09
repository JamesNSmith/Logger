class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :u_id
      t.string :username
      t.string :email
      t.string :password_digest
      #t.string :nick_name
      t.string :first_name
      t.string :last_name
      t.string :utype

      t.timestamps
    end
  end
end
