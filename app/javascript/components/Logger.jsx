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

  /*
  this.state = { position: 'closed' };
    this.state.position = this.props.state

    this.clickHandler = this.clickHandler.bind(this);
  clickHandler(e){
    console.log('click')
    this.props.onClick(e)
    console.log(e)
    if(this.state.position == 'closed'){
      this.setState({position: 'open'},console.log(this.state.position))
    } else {
      this.setState({position: 'closed'},console.log(this.state.position))
    }
  }*/

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
  /*
  handleChange(e) {
    this.setState({ value: e.target.value.toLowerCase().trim() });

  }
  */

  render() {
    const {
      children,
      style,
      className,
      'aria-labelledby': labeledBy,
    } = this.props;

    const value = this.props.value;

    //var query = React.Children.toArray(children).filter(
            //child =>
              //!value || child.props.children.toLowerCase().startsWith(value.toLowerCase()),
          //)

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
		//this.props.addDataRow();
		//console.log(this.props.addDataRow)
		//console.log(this.props.addDataRow({}))

		this.handleAdd = this.handleAdd.bind(this);
    //this.menuHandler = this.menuHandler.bind(this);

    window.flightControllerDependents['logger'] = this

    this.memberships = window.memberships
    this.totalClubUsers = window.clubUsers
    this.totalAircrafts = window.aircrafts
		
    this.state = {
			data:{
        aircraftId:'',//aircraft
				registration:'',
				acName:'',
        tugId:'',//tug
        tugregistration:'',
        tugacName:'',
        launchType:'winch',
        releaseHeight:'2000',
        p1Id:'',//P1
        p1Username:'',
				p1FName:'',
				p1LName:'',
        p1MembershipId:'',
        p1LaunchFee:'',
        p1SoaringFee:'',
        p2Id:'', //P2
        p2Username:'',
        p2FName:'',
        p2LName:'',
        p2MembershipId:'',
        p2LaunchFee:'',
        p2SoaringFee:'',
        payee:'p1',//payment
				launchFee:'',
				soaringFee:'',
        launchTime:'',//time
        landTime:''
			},
      p1ClubUsers:this.totalClubUsers,
      p2ClubUsers:this.totalClubUsers,
      aircrafts:this.totalAircrafts
		}
	}

//coms -------------------------------------
  //message(){
    //console.log('Logger')
  //}

//utils --------------------------------------
  clear(){
    console.log('clear')
    const data = this.state.data
    for(var line in data){
      data[line] = ''
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

  setMembership(membership,user){
    var data = [
      [user+'MembershipId', membership['id']],
      [user+'LaunchFee', membership['launchFee']],
      [user+'SoaringFee', membership['soaringFee']]
    ]
    this.setData(data)
  }

//handlers -----------------------------------

  handleAdd(event){
    console.log('add');
    const formData = Object.assign({},this.state.data);
    console.log(formData)
    this.fligthController.addFromLogger(formData)
    //this.props.update(formData)
    this.clear()
  }

	handleChange(event){
		const data = this.state.data
		const {name,value} = event.target
		data[name] = value
		this.setState({data:data},console.log(this.state.data));
	}

  membershipHandler(event,memberships,user){
    this.setMembership(memberships[event.target.value],user)
  }

  /*menuHandler(event,column){
    console.log('menuHandler')
    console.log(column)
    console.log(event.target.name)
    this.setData([['p1'+column,event.target.innerHTML]])
  }*/

  //formHandler(e){
    //console.log(e)
  //}

	handleClear(event){
		this.clear()
	}

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

    return(
      <Form.Control as="select" onChange={e => this.membershipHandler(e,memberships,user)} value={this.state.data[user+'MembershipId']}>
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

    var filter = (handler = (result) => {console.log(result)}) => {
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
      this.setState(data,handler(lst));
    }

    var menuUpdateHandler = (text,columnFull,key) => {
      var users = this.state[menuName]
      if(users.length == 1){

        var lst = []
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
    
      <Form.Group className="group" controlId="formGridFName" >
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

    var filter = (handler = (result) => {console.log(result)}) => {
      console.log('aircraft filter')

      var columns = {}
      for(var key in columnNames){
        columns[columnNames[key]] = this.state.data[columnNames[key]]
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
    var menuName = 'aircrafts';

    var filter = (handler = (result) => {console.log(result)}) => {
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
      
      if(returnHeight >= 2000){
        this.setData([['releaseHeight',returnHeight.toString()]]);
      }
    }

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
            <Button variant="outline-secondary" onClick={(e) => handleClick(e,+1000)}>+</Button>
            <Button variant="outline-secondary" onClick={(e) => handleClick(e,-1000)}>-</Button>
          </InputGroup.Prepend>
          <FormControl disabled aria-describedby="basic-addon1" value={this.state.data['releaseHeight']}/>
        </InputGroup>
      </Form.Group>

      </Form.Row>

    );
  }

	render(){
		return(
			<div>
			
<div className="form">
<Form className="formform" onSubmit={e => this.handleAdd(e)} >
  

  
  {this.aircraft()}

  {this.tug()}
    
  {this.user('P1','p1')}

  {this.user('P2','p2')}

    

  

  <Form.Row className="row">
  <Form.Label><h3>Fees</h3></Form.Label>

  	<Form.Group className="group" controlId="formGridState">
  	  <Form.Label>Membership</Form.Label>
      <Form.Control as="select">
        <option>Full</option>
        <option>Junior</option>
        <option>Tempory Member</option>
      </Form.Control>
    </Form.Group>

    <Form.Group className="group" controlId="formGridEmail" >
      <Form.Label>Launch Fee</Form.Label>
      <Form.Control placeholder="Launch Fee" name="launchFee" onChange={e => this.handleChange(e)} value={this.state.data["lFee"]}/>
    </Form.Group>

    <Form.Group className="group" controlId="formGridPassword" >
      <Form.Label>Soaring Fee</Form.Label>
      <Form.Control placeholder="Soaring Fee" name="soaringFee" onChange={e => this.handleChange(e)} value={this.state.data["sFee"]}/>
    </Form.Group>

  </Form.Row>

  <Form.Group id="formGridCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>

  <Button variant="outline-success" onClick={e => this.handleAdd(e)}>
    Add
  </Button>
  <Button variant="outline-danger" onClick={e => this.handleClear(e)}>
    Clear
  </Button>
</Form>
</div>


			</div>
			

		);
	}

  componentDidMount(){
    console.log('logger did mount')
    this.setMembership(this.memberships[Object.keys(this.memberships)[0]],'p1')
    this.setMembership(this.memberships[Object.keys(this.memberships)[0]],'p2')
   
  }

  componentWillUpdate(){
    console.log('update')
  }

  componentWillUnmount(){
    console.log('end logger')
  }
}

export default Logger