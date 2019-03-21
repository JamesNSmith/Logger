import React from "react"

import Table from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown'

import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'

import Button from 'react-bootstrap/Button'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

import FlightController from '../utilities/flightController'

class CustomToggle extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
          onClick: this.props.onClick
        });
    });
    
    return (
      <div>
        {children}
      </div>
    );
  }
}

class CustomMenu extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { value: '' };
  }

  render() {
    const {
      children,
      style,
      className,
      'aria-labelledby': labeledBy,
    } = this.props;

    const value = this.props.value;

    const childs = React.Children.map(this.props.children, child => {
      return React.cloneElement(child,{});
    });

    return (
      <div style={style} className={className} aria-labelledby={labeledBy}>
        <ul className="list-unstyled">
          {childs}
        </ul>
      </div>
    );
  }
}


class Logger extends React.Component {
	constructor(props){
		super(props);

		//this.handleAdd = this.handleAdd.bind(this);
    this.setPayee = this.setPayee.bind(this);

    window.flightControllerDependents['logger'] = this

    this.memberships = window.memberships
    this.totalClubUsers = window.clubUsers
    this.totalAircrafts = window.aircrafts
		
    this.state = {
			data:{
        user:'',//Info
        date:'', 
        club:'',
        aircraftId:'',//aircraft
				registration:'',
				acName:'',
        tugId:'',//tug
        tugregistration:'',
        tugacName:'',
        launchType:'',
        releaseHeight:'',
        p1Id:'',//P1
        p1Username:'',
				p1FName:'',
				p1LName:'',
        p1MembershipId:'',
        p1LaunchFee:'',
        p1SoaringFee:'',
        p1AerotowStandardFee:'',
        p1AerotowUnitFee:'',
        p2Id:'', //P2
        p2Username:'',
        p2FName:'',
        p2LName:'',
        p2MembershipId:'',
        p2LaunchFee:'',
        p2SoaringFee:'',
        p2AerotowStandardFee:'',
        p2AerotowUnitFee:'',
        payee:'',//payment
        aerotowStandardFee:'',//aerotow
        aerotowUnitFee:'',
        aerotowLaunchFee:'',
				launchFee:'', //winch
				soaringFee:'',
        launchTime:'',//time
        landTime:''
			},
      p1ClubUsers:this.totalClubUsers,
      p2ClubUsers:this.totalClubUsers,
      aircrafts:this.totalAircrafts,
      tugAircrafts:this.totalAircrafts
		}

    this.defaultValues = [
      ['launchType','winch'],
      ['releaseHeight','2000'],
      ['payee','p1'],
      ['user',window.user],
      ['date',new Date()],
      ['club',window.club]
    ];

    for(var key in this.defaultValues){
      this.state.data[this.defaultValues[key][0]] = this.defaultValues[key][1]
    }
	}
//Calculations
getAerotowFee(launchFee,unitFee,height){
    var figure = parseInt(launchFee) + parseInt(unitFee)*parseInt(height - 2000)/1000
    console.log(figure)
    return figure 
  }

//formatters
  formatDate(date){
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();

    return (day.toString() + " / " + month.toString() + " / " + year.toString());
  }

// Helpers
  clear(){
    console.log('clear')
    const data = this.state.data

    for(var line in data){
      data[line] = ''
    }

    for(var key in this.defaultValues){
      data[this.defaultValues[key][0]] = this.defaultValues[key][1]
    }

    this.setState({data:data});
  }

  setData(nameValue,successHandler = () => {console.log(this.state.data)}){
    console.log(nameValue)
    const data = this.state.data
    for(var key in nameValue){
      data[nameValue[key][0]] = nameValue[key][1]
    }
    this.setState({data:data},successHandler());
  }

  setMembership(membership,user,start=false){
    var data = [
      [user+'MembershipId', membership['id']],
      [user+'LaunchFee', membership['launchFee']],
      [user+'SoaringFee', membership['soaringFee']],
      [user+'AerotowStandardFee', membership['aerotowStandardFee']],
      [user+'AerotowUnitFee', membership['aerotowUnitFee']]
    ]

    if(!start){
      console.log('start')
      var fees = [
        ['payee', user],
        ['launchFee', membership['launchFee']],
        ['soaringFee', membership['soaringFee']],
        ['aerotowStandardFee', membership['aerotowStandardFee']],
        ['aerotowUnitFee', membership['aerotowUnitFee']],
        ['aerotowLaunchFee',this.getAerotowFee(membership['aerotowStandardFee'],membership['aerotowUnitFee'],this.state.data['releaseHeight'])]
      ]
      data = data.concat(fees)

    }
    this.setData(data)
  }

  setPayee(payee){
    const columns = ['launchFee','soaringFee']

    const data = this.state.data
    var launchType = this.state.data['launchType']

    data['payee'] = payee

    var objectKey = ''
    for(var key in columns){
      data[columns[key]] = data[payee + columns[key][0].toUpperCase() + columns[key].slice(1)]
    }

    this.setState({data:data},console.log(this.state.data))
  }

//handlers -----------------------------------
	handleChange(event){
		const data = this.state.data
		const {name,value} = event.target
		data[name] = value
		this.setState({data:data},console.log(this.state.data));
	}

  //membershipHandler(event,memberships,user){
    //this.setMembership(memberships[event.target.value],user)
  //}


//constructors ---------------------------------
  membership(memberships,user){
    var options = () => {
      var lst = [];
      for(var key in memberships){
        var defkey = 'opt' + key
        lst.push(<option key = {defkey} value={key}>{memberships[key]['name']}</option>);
      }
      return lst
    }
    //this.membershipHandler(e,memberships,user)
    return(
      <Form.Control as="select" onChange={e => this.setMembership(memberships[e.target.value],user)} value={this.state.data[user+'MembershipId']}>
        {options()}
      </Form.Control>
    );
  }

  dropdownInput(column,columnFull,placeHolder,dropdownRows,filter,menuUpdateHandler){
    var formHandler = (event) => {
      const {name,value} = event.target
      this.setData([[name,value]],filter)
    }

    var menuHandler = (event,columnFull,key) => {
      var text = event.target.innerHTML

      var menuQueue = new Promise((resolve,reject) => {this.setData([[columnFull,text]],resolve)})
      .then(()=>{return new Promise((resolve,reject) => {filter(resolve)})})
      .then(()=>{menuUpdateHandler(text,columnFull,key)})
      .catch((error) => {console.log('menuQueue failed:');console.log(error)})
      
    }

    var dropRows = (column,columnFull) => {
      
      var lst = []
      for(var key in dropdownRows){
        var idkey = 'DI' + key
        lst.push(<Dropdown.Item key={idkey} eventKey={key} onClick={e => menuHandler(e,columnFull,key)}>{dropdownRows[key][column]}</Dropdown.Item>);
      }
      return lst
    }

    return (
      <Dropdown dropupauto="false">
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          <Form.Control autoComplete="new-password" placeholder={placeHolder} name={columnFull} onChange={e => formHandler(e)}  value={this.state.data[columnFull]}/>
        </Dropdown.Toggle>

        <Dropdown.Menu key={"DM" + columnFull} as={CustomMenu} value={this.state.data[columnFull]}>
          {dropRows(column,columnFull)}
        </Dropdown.Menu>
      </Dropdown>
      );
  }

  user(title,user){
    var columnNames = ['FName','LName']
    var menuName = user+'ClubUsers'

    var filter = (handler = () => {}) => {
      var lst = []
      var columns = {}
      var tUsers = this.totalClubUsers

      for(var key in columnNames){
        columns[columnNames[key]] = this.state.data[user+columnNames[key]]
      }
      
      for(var userKey in tUsers){
        var count = 0
        for(var columnKey in columns){
          if(!((tUsers[userKey][columnKey].toLowerCase().startsWith(columns[columnKey].toLowerCase()))||(columns[columnKey] == ''))){count++}
        }
        if(count == 0){lst.push(tUsers[userKey])}
      }

      var data = {}
      data[menuName] = lst
      this.setState(data,handler());
    }

    var menuUpdateHandler = (text,columnFull,key) => {
      var users = this.state[menuName]
      var lst = []

      if(users.length == 1){

        var clubUser = users[0]
        for(var key in clubUser){

          if(key == 'MembershipId'){
            this.setMembership(this.memberships[clubUser['MembershipId']],user)
          } else {
          lst.push([user + key,clubUser[key]])
          }
        }
        this.setData(lst)

      } else {
        this.setData([[columnFull,text]])
      }

        
    }

    return(
    <Form.Row className="row">
      <Form.Label><h3>{title}</h3></Form.Label>
    
      <Form.Group className="group" controlId="formGridName" >
        <Form.Label>Name</Form.Label>
      
        <ul id="name">

        <li>
        {this.dropdownInput('FName',user+'FName',"First Name",this.state[menuName],filter,menuUpdateHandler)}
        </li>

        <li>
        {this.dropdownInput('LName',user+'LName',"Last Name",this.state[menuName],filter,menuUpdateHandler)}
        </li>
        </ul>
        
      </Form.Group>

      <Form.Group className="group" controlId="formGridState">
        <Form.Label>Membership</Form.Label>

        {this.membership(this.memberships,user)}

      </Form.Group>

    </Form.Row>
    );
  }

  aircraftFilter(columns){
    var lst = []
    var tAircrafts = this.totalAircrafts
      
    for(var aircraftKey in tAircrafts){
      var count = 0
      for(var columnKey in columns){

        if(!((tAircrafts[aircraftKey][columnKey].toLowerCase().startsWith(columns[columnKey].toLowerCase()))||(columns[columnKey] == ''))){
          if(!tAircrafts[aircraftKey][columnKey].toLowerCase().slice(3).startsWith(columns[columnKey].toLowerCase())){
            count++
          }
        }

      }
      if(count == 0){lst.push(tAircrafts[aircraftKey])}
    }
    return lst
  }

  aircraft(){
    var columnNames = ['registration','acName']; //
    var menuName = 'aircrafts';

    var filter = (handler = () => {}) => {
      console.log('aircraft filter')

      var columns = {}
      for(var key in columnNames){
        columns[columnNames[key]] = this.state.data[columnNames[key]]
      }

      var aircraftList = this.aircraftFilter(columns)

      var data = {}
      data[menuName] = aircraftList
      this.setState(data,handler());
    }

    var menuUpdateHandler = (text,columnFull,key) => {
      var aircrafts = this.state[menuName]
      if(aircrafts.length == 1){

        var lst = []
        var aircraft = aircrafts[0]
        for(var key in aircraft){
          
          if(key == 'id'){
            lst.push(['aircraftId',aircraft[key]])
          } else {
            lst.push([key,aircraft[key]])
          }

        }
        this.setData(lst)

      } else {
        this.setData([[columnFull,text]])
      }
    }

    return (
      <Form.Row className="row">
      <Form.Label><h3>Aircraft</h3></Form.Label>

      <Form.Group className="group" controlId="formGridRegistration" >
        <Form.Label>Registration</Form.Label>
        {this.dropdownInput('registration','registration',"Registration",this.state[menuName],filter,menuUpdateHandler)}
      </Form.Group>

      <Form.Group className="group" controlId="formGridacName">
        <Form.Label>Name</Form.Label>
        {this.dropdownInput('acName','acName',"Name",this.state[menuName],filter,menuUpdateHandler)}
      </Form.Group>

      <Form.Group className="group" controlId="formGridacName">
        <Form.Label>Launch</Form.Label>
        <ToggleButtonGroup name="launchType" type="radio" onChange={(event) => this.setData([['launchType',event]])} value={this.state.data['launchType']}>
        <ToggleButton variant="outline-primary" value={'winch'}>Winch</ToggleButton>
        <ToggleButton variant="outline-primary" value={'aerotow'}>Aerotow</ToggleButton>
        </ToggleButtonGroup>
      </Form.Group>

      </Form.Row>

    );
  }
  
  tug(){
    var columnNames = ['registration','acName']; //
    var menuName = 'tugAircrafts';

    var filter = (handler = () => {}) => {
      console.log('tug filter')

      var columns = {}
      for(var key in columnNames){
        columns[columnNames[key]] = this.state.data['tug' + columnNames[key]]
      }

      var aircraftList = this.aircraftFilter(columns)

      var data = {}
      data[menuName] = aircraftList
      this.setState(data,handler(aircraftList));
    }

    var menuUpdateHandler = (text,columnFull,key) => {
      var aircrafts = this.state[menuName]
      if(aircrafts.length == 1){

        var lst = []
        var aircraft = aircrafts[0]
        for(var key in aircraft){
          
          if(key == 'id'){
            lst.push(['tugId',aircraft[key]])
          } else {
            lst.push(['tug'+key,aircraft[key]])
          }

        }
        this.setData(lst)

      } else {
        this.setData([[columnFull,text]])
      }
    }

    var handleClick = (event,figure) => {
      var height = this.state.data['releaseHeight']
      var returnHeight = (parseInt(height) + figure)
      var returnLst = [['releaseHeight',returnHeight.toString()]]

      if(returnHeight >= 2000){
        if(this.state.data['aerotowLaunchFee'] != ''){
          returnLst[1] = ['aerotowLaunchFee',this.getAerotowFee(this.state.data['aerotowStandardFee'],this.state.data['aerotowUnitFee'],returnHeight)]
        }

        this.setData(returnLst);
      }
    }
    //<FormControl disabled aria-describedby="basic-addon1" value={this.state.data['releaseHeight']}/>
    return (
      <Form.Row className={(this.state.data['launchType'] == 'winch') ? "row hideTug" : "row showTug"}>
      <Form.Label><h3>Tug</h3></Form.Label>

      <Form.Group className="group" controlId="formGridRegistration" >
        <Form.Label>Registration</Form.Label>
        {this.dropdownInput('registration','tugregistration',"Registration",this.state[menuName],filter,menuUpdateHandler)}
      </Form.Group>

      <Form.Group className="group" controlId="formGridacName">
        <Form.Label>Name</Form.Label>
        {this.dropdownInput('acName','tugacName',"Name",this.state[menuName],filter,menuUpdateHandler)}
      </Form.Group>

      <Form.Group className="group" controlId="formGridacName">
        <Form.Label>Release Height</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <Button variant="outline-primary" onClick={(e) => handleClick(e,+1000)}>+</Button>
            <Button variant="outline-primary" onClick={(e) => handleClick(e,-1000)}>-</Button>
            <Button variant="outline-primary" onClick={(e) => handleClick(e,+1000)}>{this.state.data['releaseHeight']}</Button>
          </InputGroup.Prepend>
        </InputGroup>
      </Form.Group>

      </Form.Row>

    );
  }

  fees(){

    var launch = () => {
      if(this.state.data['launchType'] == 'aerotow'){

        return (
        <div className = "placeHolder">
        <Form.Group className="group" controlId="formGridEmail" >
          <Form.Label>Aerotow Launch to 2000</Form.Label>
          <Form.Control placeholder="Launch Fee" name="aerotowStandardFee" onChange={(e) => {this.setData([[e.target.name,e.target.value]])}} onClick={(e)=>e.target.select()} value={this.state.data["aerotowStandardFee"]}/>
        </Form.Group>

        <Form.Group className="group" controlId="formGridEmail" >
          <Form.Label>Fee per 1000ft above</Form.Label>
          <Form.Control placeholder="Launch Fee" name="aerotowUnitFee" onChange={(e) => {this.setData([[e.target.name,e.target.value]])}} onClick={(e)=>e.target.select()} value={this.state.data["aerotowUnitFee"]}/>
        </Form.Group>

        <Form.Group className="group" controlId="formGridEmail" >
          <Form.Label>Launch Fee</Form.Label>
          <Form.Control placeholder="Launch Fee" name="aerotowLaunchFee" onChange={(e) => {this.setData([[e.target.name,e.target.value]])}} onClick={(e)=>e.target.select()} value={this.state.data["aerotowLaunchFee"]}/>
        </Form.Group>
        </div>
        );

      } else {
    
        return (
        <Form.Group className="group" controlId="formGridEmail" >
          <Form.Label>Launch Fee</Form.Label>
          <Form.Control placeholder="Launch Fee" name="launchFee" onChange={(e) => {this.setData([[e.target.name,e.target.value]])}} onClick={(e)=>e.target.select()} value={this.state.data["launchFee"]}/>
        </Form.Group>
        );

      }
    }
    
    return (
      <Form.Row className="row">
      <Form.Label><h3>Fees</h3></Form.Label>

      <Form.Group className="group" controlId="formGridacName">
        <Form.Label>Payee</Form.Label>
        <ToggleButtonGroup name="launchType" type="radio" onChange={this.setPayee} value={this.state.data['payee']}>
        <ToggleButton variant="outline-primary" value={'p1'}>P1</ToggleButton>
        <ToggleButton variant="outline-primary" value={'p2'}>P2</ToggleButton>
        </ToggleButtonGroup>
      </Form.Group>

      {launch()}
      
      <Form.Group className="group" controlId="formGridPassword" >
        <Form.Label>Soaring Fee</Form.Label>
        <Form.Control placeholder="Soaring Fee" name="soaringFee" onChange={(e) => {this.setData([[e.target.name,e.target.value]])}} onClick={(e)=>e.target.select()} value={this.state.data["soaringFee"]}/>
      </Form.Group>

      </Form.Row>
    );
  }

	render(){
    var handleAdd = (event) => {
      console.log('add');
      const formData = Object.assign({},this.state.data);
      console.log(formData)
      this.fligthController.addFromLogger(formData)
      this.clear()
    }

    var handleClear = (event) =>{
      this.clear()
    }

		return(
			<div>
			
        <div className="form">
          <Form className="formform" onSubmit={e => this.handleAdd(e)} >

            <Form.Row className="row">
            <Form.Label><h3>Info</h3></Form.Label>
              <Form.Group className="group" controlId="formGridDate" >
                <Form.Control disabled aria-describedby="basic-addon1" placeholder="Date" name="date" value={this.formatDate(this.state.data['date'])}/>
              </Form.Group>

              <Form.Group className="group" controlId="formGridClub" >
                <Form.Control disabled aria-describedby="basic-addon1" placeholder="Club" name="club" value={this.state.data['club']['name']}/>
              </Form.Group>

            </Form.Row>
  
            {this.aircraft()}

            {this.tug()}
    
            {this.user('P1','p1')}

            {this.user('P2','p2')}

            {this.fees()}  


            <Button variant="outline-success" onClick={e => handleAdd(e)}>
              Add
            </Button>
            <Button variant="outline-danger" onClick={e => this.clear()}>
              Clear
            </Button>

          </Form>
        </div>

			</div>
		);
	}

  componentDidMount(){
    console.log('logger did mount')
    this.setMembership(this.memberships[Object.keys(this.memberships)[0]],'p1',true)
    this.setMembership(this.memberships[Object.keys(this.memberships)[0]],'p2',true)
    
  }

  componentWillUpdate(){
    console.log('update')
  }

  componentWillUnmount(){
    console.log('end logger')
  }
}

export default Logger