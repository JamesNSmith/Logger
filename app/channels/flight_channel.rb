class FlightChannel < ApplicationCable::Channel
  def subscribed
    stream_from "flight_channel"
  end

  def receive(data)
  	puts('receive ------------------------')
    
  	if data["handshake"]
  		puts(data["handshake"])
    end

    case data["title"]
    when 'get'
      @flights = Flight.all.limit(6)
      puts(@flights)
      ActionCable.server.broadcast 'flight_channel', id:data["id"], title:'get', content:formatCable(@flights)
    when 'add'
      puts(data["header"])
      puts(data["content"])
      add(data)
      
    end
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  private #------------------------------------------------------------------
  #helpers ------------------------------------------------------------------
  def formatCable(data)
    @retData = []
    data.each do |record|
      @retData.push({
        flightNumber:record.id,
        acName: record.aircraft.name,
        tailNumber: record.aircraft.registration,
        p1Username: record.club_user_p1.user.username,
        p1FName: record.club_user_p1.user.first_name,
        p1LName: record.club_user_p1.user.last_name,
        p2Username: record.club_user_p2.user.username,
        p2FName: record.club_user_p2.user.first_name,
        p2LName: record.club_user_p2.user.last_name,
        launchTime: record.launch_time,
        landTime: record.land_time,
        flightTime: record.flight_time,
        launchFee: record.launch_fee,
        soaringFee: record.soaring_fee,
        soaringTotal: record.soaring_total,
        total: record.total
      })
    end
    return @retData
  end

  #Main ----------------------------------------------------------------------
  def aircraft(data)
    if data['aircraftId']
      return Aircraft.find(data['aircraftId'])
    end

    @aircraftQuery = Aircraft.where(registration: data['tailNumber'])
    if @aircraftQuery.length == 0
      @keys = {
        registration:data['tailNumber'],
        name:data['acName'],
        actype:'glider'
      }
      @aircraft = Aircraft.new(@keys)

      if @aircraft.save
        return @aircraft
      end 
    else
      return @aircraftQuery.first
    end
  end

  def addMembership(user,club,membership)
    @clubUserKeys = {
      user:user,
      club:club,
      membership:membership
    }
    @clubUser = ClubUser.new(@clubUserKeys)

    if @clubUser.save
      return @clubUser
    end
  end

  def addUser(username,firstName,lastName)
    @defaultPassword = '@4321'
    @userKeys = {
      username:username,
      first_name:firstName,
      last_name:lastName,
      password:@defaultPassword,
      password_confirmation:@defaultPassword
    }
    @user = User.new(@userKeys)

    if @user.save 
      return @user
    end
  end

  def user(data,id,username,firstName,lastName,membership) #Very dodgy ---------------
    if id != nil
      return ClubUser.find(id)
    end #What if the user isn't a memeber
      
    @users = Club.find(data['club']).users
    @userQuery = @users.where("first_name = ? AND last_name = ?",firstName,lastName)

    if @userQuery.length == 0
      @user = addUser(username,firstName,lastName)
      return addMembership(@user,Club.find(data['club']),Membership.find(membership))
    
    else
      @membership = @userQuery.first.club_users #.where(club:data['club'])
      if @membership.length == 0
        return addMembership(@userQuery.first,Club.find(data['club']),Membership.find(membership))
      else
        return @membership.first
      end
    end
  end

  def p1User(data)
    @id = data['p1Id']
    @username = data['p1Username']
    @firstName = data['p1FName']
    @lastName = data['p1LName']
    @membership = data['p1Membership']

    return user(data,@id,@username,@firstName,@lastName,@membership)
  end

  def p2User(data)
    @id = data['p2Id']
    @username = data['p2Username']
    @firstName = data['p2FName']
    @lastName = data['p2LName']
    @membership = data['p2Membership']

    return user(data,@id,@username,@firstName,@lastName,@membership)
  end


  def add(data)
    @header = data["header"]
    @content = data["content"]
    @content['user'] = 3
    @content['club'] = 2
    @content['takeoffType'] = 'winch'
    @content['p1Membership'] = 5
    @content['p2Membership'] = 5
    
    @keys = {
      user:User.find(@content['user']),
      club:Club.find(@content['club']),

      aircraft: aircraft(@content),
      takeoff_type:@content['takeoffType'],

      club_user_p1:p1User(@content),
      club_user_p2:p2User(@content),      

      launch_date: Date.parse(@content['launchTime']),
      launch_time: @content['launchTime'],
      land_time: @content['landTime'],
      flight_time: @content['flightTime'], 

      launch_fee: @content['launchFee'], 
      soaring_fee: @content['soaringFee'], 
      soaring_total: @content['soaringTotal'], 
      total: @content['total'] 
    }

    @flight = Flight.new(@keys)
    puts('flights')
    if @flight.save
      puts(@flight['id'])
      ActionCable.server.broadcast 'flight_channel', id:data["id"], title:'add', content:{flightNumber:@flight['id']}
    else
      ActionCable.server.broadcast 'flight_channel', id:data["id"], title:'add', content:{error:'end'}
    end
        
  end

end
