# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

u1 = User.create(email: 'carlos@email.com', password: 'Carlos1', password_confirmation: 'Carlos1', first_name: 'Carlos', last_name: 'Bueno')
u2 = User.create(email: 'freida@email.com', password: 'Freida1', password_confirmation: 'Freida1', first_name: 'Frieda', last_name: 'Bueno')
u3 = User.create(email: 'julian@email.com', password: 'Julian1', password_confirmation: 'Julian1', first_name: 'Julian', last_name: 'Bueno')

u4 = User.create(email: 'jamesnsmith97@gmail.com', password: '01020102', password_confirmation: '01020102', first_name: 'James', last_name: 'Smith', utype: 'clubadmin')
u5 = User.create(email: 'jamesnsmith@hotmail.co.uk', password: '01020102', password_confirmation: '01020102', first_name: 'James', last_name: 'Smith', utype: 'webadmin')


c1 = Club.create(name:'Logger Club', initials:'LC', country:'UK')
c2 = Club.create(name:'Test Club', initials:'TC', country:'UK')

c1.users << [u1,u2,u3]
c2.users << [u4,u5]