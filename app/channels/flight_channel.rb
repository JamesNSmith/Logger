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
      return Aircraft.find(data['aircraftId'])['id']  #Just data['aircraftId']????
    else
      @record = Aircraft.where(registration: data['tailNumber'])
      if @record.length == 0
        @keys = {
          registration:data['tailNumber'],
          name:data['acName'],
          actype:'glider'
        }
        @aircraft = Aircraft.new(@keys)
        if @aircraft.save
          return @aircraft['id']
        end
        
      else
        return (@record.take)['id']
      end
    end
  end

  def user(data,index)
    console.log('user')
    @id = data['p'+index+'id']
    @username = data['p'+index+'Username']
    @firstName = data['p'+index+'FName']
    @lastName = data['p'+index+'LName']

    if @id != nil
      return @id
    else 
      @club = Club.find(data['club'])
      puts(@user)
      @user = @club.users.where(first_name:@firstName,last_name:@last_name)
      puts(@user)
    end

  end

  def add(data)
    @header = data["header"]
    @content = data["content"]
    @content['user'] = 3
    @content['club'] = 2
    @content['takeoffType'] = 'winch'
    
    @keys = {
      user:@content['user'],
      club:@content['club'],
      takeoff_type:@content['takeoffType'],
      #aircraft: aircraft(@content),

      #club_user_p1:,
      #club_user_p2:,

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
    puts(aircraft(@content))
    puts(user(@content),1)
    #puts(@flight.save)
    #if @flight.save
    ActionCable.server.broadcast 'flight_channel', id:data["id"], title:'add', content:'returnCable'
    #else
      #ActionCable.server.broadcast 'flight_channel', id:data["id"], title:'add', content:'error'
    #end
        
  end

end
