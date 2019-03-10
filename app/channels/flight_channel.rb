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
    when 'insert'
      puts(data["headers"])
      puts(data["content"])
    when 'get'
      @flights = Flight.all
      puts(@flights)
      ActionCable.server.broadcast 'flight_channel', id:data["id"], title:'get', content:formatCable(@flights)
    end


  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  private
  def formatCable(data)
    @retData = []
    data.each do |record|
      @retData.push({
        flightNumber:record.id,
        acName: record.aircraft.name,
        tailNumber: record.aircraft.tail_number,
        p1Username: record.club_user_p1.user.username,
        p1FName: record.club_user_p1.user.first_name,
        p1LName: record.club_user_p1.user.last_name,
        p2Username: record.club_user_p2.user.username,
        p2FName: record.club_user_p2.user.first_name,
        p2LName: record.club_user_p2.user.last_name,
        launchTime:record.launch_time,
        landTime:record.land_time,
        launchFee: record.launch_fee,
        soaringFee: record.soaring_fee
      })
    end
    return @retData
  end
end
