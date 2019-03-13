# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
ua1 = User.create(username:'jamesnsmith',email: 'jamesnsmith@hotmail.co.uk', password: '01020102', password_confirmation: '01020102', first_name: 'James', last_name: 'Smith', utype: 'webadmin')
ua2 = User.create(username:'jamesnsmith97',email: 'jamesnsmith97@gmail.com', password: '01020102', password_confirmation: '01020102', first_name: 'James', last_name: 'Smith', utype: 'clubadmin')

u1 = User.create(username:'carlosBu',email: 'carlos@email.com', password: 'Carlos1', password_confirmation: 'Carlos1', first_name: 'Carlos', last_name: 'Bueno')
u2 = User.create(username:'freidaBu',email: 'freida@email.com', password: 'Freida1', password_confirmation: 'Freida1', first_name: 'Frieda', last_name: 'Bueno')
u3 = User.create(username:'julianBu',email: 'julian@email.com', password: 'Julian1', password_confirmation: 'Julian1', first_name: 'Julian', last_name: 'Bueno')

u4 = User.create(username:'losBu',email: 'los@email.com', password: 'Carlos1', password_confirmation: 'Carlos1', first_name: 'los', last_name: 'Bueno')
u5 = User.create(username:'idaBu',email: 'ida@email.com', password: 'Freida1', password_confirmation: 'Freida1', first_name: 'eda', last_name: 'Bueno')
u6 = User.create(username:'lianBu',email: 'lian@email.com', password: 'Julian1', password_confirmation: 'Julian1', first_name: 'lian', last_name: 'Bueno')

cd1 = Club.create(name:'Default', initials:'D', country:'UK')
c1 = Club.create(name:'Logger Club', initials:'LC', country:'UK')
c2 = Club.create(name:'Test Club', initials:'TC', country:'UK')

md1 = Membership.create(name: 'Default', mtype: true)
m1 = Membership.create(name: 'Full', mtype: true, launch_fee:7.00, soaring_fee:0.3)
m2 = Membership.create(name: 'Junior', mtype: true, launch_fee:4.50, soaring_fee:0.15)
m3 = Membership.create(name: 'Trial', mtype: true, launch_fee:4.50, soaring_fee:0.15)

#md2 = Membership.create(name: 'Default', mtype: false)
m4 = Membership.create(name: 'Full', mtype: false, launch_fee:7.00, soaring_fee:0.6)
m5 = Membership.create(name: 'Junior', mtype: false, launch_fee:4.50, soaring_fee:0.3)
m6 = Membership.create(name: 'Trial', mtype: false, launch_fee:4.50, soaring_fee:0.3)

#md3 = Membership.create(name: 'Default', mtype: false)
m7 = Membership.create(name: 'Full', mtype: false, launch_fee:8.00, soaring_fee:0.4)
m8 = Membership.create(name: 'Junior', mtype: false, launch_fee:6.00, soaring_fee:0.25)
m9 = Membership.create(name: 'Trial', mtype: false, launch_fee:6.00, soaring_fee:0.3)

a1 = Aircraft.create(registration:'G-CUHJ', name:'k13', actype:'glider')
a2 = Aircraft.create(registration:'G-CUGF', name:'k13', actype:'glider')
a3 = Aircraft.create(registration:'G-CIOP', name:'k8', actype:'glider')
a4 = Aircraft.create(registration:'G-CHYT', name:'Puchacz', actype:'glider')
a5 = Aircraft.create(registration:'G-CIRC', name:'k8', actype:'glider')
a6 = Aircraft.create(registration:'G-CHUV', name:'Puchacz', actype:'glider')

cud = ClubUser.create(user:ua2,club:cd1,membership:md1)
cu1 = ClubUser.create(user:u1,club:c1,membership:m4)
cu2 = ClubUser.create(user:u2,club:c1,membership:m4)
cu3 = ClubUser.create(user:u3,club:c1,membership:m5)
cu4 = ClubUser.create(user:u4,club:c2,membership:m7)
cu5 = ClubUser.create(user:u5,club:c2,membership:m8)
cu6 = ClubUser.create(user:u6,club:c2,membership:m9)

f1 = Flight.create(user:u3,club:c1,takeoff_type:"winch",aircraft:a1,club_user_p1:cu1,club_user_p2:cu2,launch_fee:7.00,soaring_fee:0.15,launch_date:Date.current,launch_time:Time.parse("12:00"),land_time:Time.parse("12:10"),flight_time:10)
puts(f1.errors.messages)
f2 = Flight.create(user:u6,club:c2,takeoff_type:"winch",aircraft:a3,club_user_p1:cu4,club_user_p2:cu5,launch_fee:7.00,soaring_fee:0.15,launch_date:Date.current,launch_time:Time.parse("12:00"),land_time:Time.parse("12:10"),flight_time:10)
puts(f2.errors.messages)
f3 = Flight.create(user:u3,club:c1,takeoff_type:"winch",aircraft:a1,club_user_p1:cu1,club_user_p2:cu2,launch_fee:7.00,soaring_fee:0.15,launch_date:Date.parse("2019-02-27"),launch_time:Time.parse("12:00"),land_time:Time.parse("12:10"),flight_time:10)
puts(f3.errors.messages)
f4 = Flight.create(user:u6,club:c2,takeoff_type:"winch",aircraft:a3,club_user_p1:cu4,club_user_p2:cu5,launch_fee:7.00,soaring_fee:0.15,launch_date:Date.parse("2019-02-27"),launch_time:Time.parse("12:00"),land_time:Time.parse("12:10"),flight_time:10)
puts(f4.errors.messages)
f5 = Flight.create(user:u3,club:c1,takeoff_type:"winch",aircraft:a1,club_user_p1:cu1,club_user_p2:cu2,launch_fee:7.00,soaring_fee:0.15,launch_date:Date.parse("2019-03-03"),launch_time:Time.parse("12:00"),land_time:Time.parse("12:10"),flight_time:10)
puts(f5.errors.messages)
f6 = Flight.create(user:u6,club:c2,takeoff_type:"winch",aircraft:a3,club_user_p1:cu4,club_user_p2:cu5,launch_fee:7.00,soaring_fee:0.15,launch_date:Date.parse("2019-03-03"),launch_time:Time.parse("12:00"),land_time:Time.parse("12:10"),flight_time:10)
puts(f6.errors.messages)

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

c1.aircrafts << [a1,a2]
c2.aircrafts << [a3,a4]

u1.aircrafts << [a5,a6]

#m1.users << [u1,u2] 
#m6.users << [u3,u4]
#m7.users << [u5]

#m10.users << [u6,u7]
#m11.users << [u8]


#c0.users << [u1,u2]
#1.users << [u3,u4,u5]
#c2.users << [u6,u7,u8]