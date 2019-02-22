# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
ua1 = User.create(email: 'jamesnsmith@hotmail.co.uk', password: '01020102', password_confirmation: '01020102', first_name: 'James', last_name: 'Smith', utype: 'webadmin')
ua2 = User.create(email: 'jamesnsmith97@gmail.com', password: '01020102', password_confirmation: '01020102', first_name: 'James', last_name: 'Smith', utype: 'clubadmin')

u1 = User.create(email: 'carlos@email.com', password: 'Carlos1', password_confirmation: 'Carlos1', first_name: 'Carlos', last_name: 'Bueno')
u2 = User.create(email: 'freida@email.com', password: 'Freida1', password_confirmation: 'Freida1', first_name: 'Frieda', last_name: 'Bueno')
u3 = User.create(email: 'julian@email.com', password: 'Julian1', password_confirmation: 'Julian1', first_name: 'Julian', last_name: 'Bueno')

u4 = User.create(email: 'los@email.com', password: 'Carlos1', password_confirmation: 'Carlos1', first_name: 'los', last_name: 'Bueno')
u5 = User.create(email: 'ida@email.com', password: 'Freida1', password_confirmation: 'Freida1', first_name: 'eda', last_name: 'Bueno')
u6 = User.create(email: 'lian@email.com', password: 'Julian1', password_confirmation: 'Julian1', first_name: 'lian', last_name: 'Bueno')

cd1 = Club.create(name:'Default', initials:'D', country:'UK')
c1 = Club.create(name:'Logger Club', initials:'LC', country:'UK')
c2 = Club.create(name:'Test Club', initials:'TC', country:'UK')

md1 = Membership.create(name: 'Default', mtype: true)
m1 = Membership.create(name: 'Full', mtype: true, launch_price:7.00)
m2 = Membership.create(name: 'Junior', mtype: true, launch_price:4.50)
m3 = Membership.create(name: 'Trial', mtype: true, launch_price:4.50)

#md2 = Membership.create(name: 'Default', mtype: false)
m4 = Membership.create(name: 'Full', mtype: false, launch_price:7.00)
m5 = Membership.create(name: 'Junior', mtype: false, launch_price:4.50)
m6 = Membership.create(name: 'Trial', mtype: false, launch_price:4.50)

#md3 = Membership.create(name: 'Default', mtype: false)
m7 = Membership.create(name: 'Full', mtype: false, launch_price:8.00)
m8 = Membership.create(name: 'Junior', mtype: false, launch_price:6.00)
m9 = Membership.create(name: 'Trial', mtype: false, launch_price:6.00)

cud = ClubUser.create(user:ua2,club:cd1,membership:md1)
cu1 = ClubUser.create(user:u1,club:c1,membership:m4)
cu2 = ClubUser.create(user:u2,club:c1,membership:m4)
cu3 = ClubUser.create(user:u3,club:c1,membership:m5)
cu4 = ClubUser.create(user:u4,club:c2,membership:m7)
cu5 = ClubUser.create(user:u5,club:c2,membership:m8)
cu6 = ClubUser.create(user:u6,club:c2,membership:m9)


#cmd1 = ClubMembership.create(club:cd1,membership:md1)
#cm1 = ClubMembership.create(club:cd1,membership:m1)
#cm2 = ClubMembership.create(club:cd1,membership:m2)
#cm3 = ClubMembership.create(club:cd1,membership:m3)
#cm4 = ClubMembership.create(club:c1,membership:m4)
#cm5 = ClubMembership.create(club:c1,membership:m5)
#cm6 = ClubMembership.create(club:c1,membership:m6)
#cm7 = ClubMembership.create(club:c2,membership:m7)
#cm8 = ClubMembership.create(club:c2,membership:m8)
#cm9 = ClubMembership.create(club:c2,membership:m9)

#puts c2.methods
cd1.memberships << [md1,m1,m2,m3]
c1.memberships << [m4,m5,m6]
c2.memberships << [m7,m8,m9]

#m1.users << [u1,u2] 
#m6.users << [u3,u4]
#m7.users << [u5]

#m10.users << [u6,u7]
#m11.users << [u8]


#c0.users << [u1,u2]
#1.users << [u3,u4,u5]
#c2.users << [u6,u7,u8]