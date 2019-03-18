import React from "react"
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'

import FlightController from '../utilities/flightController'

class CustomToggle extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  //click(){
    //this.props.onClick
  //}

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
		
    this.state = {
			data:{
        aircraftId:'',//aircraft
				tailNumber:'',
				acName:'',
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
      clubUsers:this.totalClubUsers
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

	handleClear(event){
		this.clear()
	}

//constructor ---------------------------------
  membership(memberships,user){
    var options = () => {
      var lst = [];
      for(var key in memberships){
        var defkey = 'opt' + key
        lst.push(<option key = {defkey} value={key}>{memberships[key]['name']}</option>);
      }
      return lst
    }

    //var handler = (event) => {
      //this.membershipHandler(event,memberships,user)
    //}

    return(
    <Form.Group className="group" controlId="formGridState">
      <Form.Label>Membership</Form.Label>
      <Form.Control as="select" onChange={e => this.membershipHandler(e,memberships,user)} value={this.state.data[user+'MembershipId']}>
        {options()}
      </Form.Control>
    </Form.Group>
    );
  }

  user(title,user,clubUsers,memberships){
    var columns = {'FName':'','LName':''}

    var filter = (handler = (result) => {console.log(result)}) => {
      var lst = []
      var tUsers = this.totalClubUsers
      
      for(var userKey in tUsers){
        var count = 0
        for(var columnKey in columns){
          if(!((tUsers[userKey][columnKey].toLowerCase().startsWith(columns[columnKey].toLowerCase()))||(columns[columnKey] == ''))){count++}
        }
        if(count == 0){lst.push(tUsers[userKey])}
      }
      this.setState({clubUsers:lst});
      return lst
    }

    var handleChange = (event) => {
      const {name,value} = event.target
      console.log('handle')
      columns[name.slice(2)] = value
      filter()

      this.setData([[name,value]])
    }

    var menuHandler = (event,column,key) => {
      columns[column] = event.target.innerHTML
      var clubUsr = filter()
      if(clubUsr.length == 1){
        console.log('filter')
        console.log(clubUsr)
        var lst = []
        var clubUser = clubUsr[0]
        for(var key in clubUser){
          lst.push([user + key,clubUser[key]])
        }
        console.log(lst)
        this.setData(lst)
      } else {
        this.setData([[user+column,event.target.innerHTML]])
      }
      
      
      console.log('end')
      console.log(this.state.clubUsers)
    }

    var userRows = (column) => {
      
      var lst = []
      for(var key in this.state.clubUsers){
        var idkey = 'DI' + key
        lst.push(<Dropdown.Item key={idkey} eventKey={key} onClick={e => menuHandler(e,column,key)}>{this.state.clubUsers[key][column]}</Dropdown.Item>);
      }
      return lst
    }

    return(
    <Form.Row className="row">
      <Form.Label><h3>{title}</h3></Form.Label>
    
      
      <Form.Group className="group" controlId="formGridFName" >
        <Form.Label>Name</Form.Label>
       
        <ul id="name">
        <li>
        <Dropdown dropupauto="false">
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            <Form.Control autoComplete="new-password" placeholder="First Name" name={user+"FName"} onChange={e => handleChange(e)} value={this.state.data[user+"FName"]}/>
          </Dropdown.Toggle>

          <Dropdown.Menu key="DMFName" as={CustomMenu} value={this.state.data[user+"FName"]}>
            {userRows('FName')}
          </Dropdown.Menu>
        </Dropdown>
        </li>

        <li>
        <Dropdown dropupauto="false">
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            <Form.Control autoComplete="new-password" placeholder="Last Name" name={user+"LName"} onChange={e => handleChange(e)} value={this.state.data[user+"LName"]}/>
          </Dropdown.Toggle>
          <Dropdown.Menu key="DMLName" as={CustomMenu} value={this.state.data[user+"LName"]}>
            {userRows('LName')}
          </Dropdown.Menu>
        </Dropdown>
        </li>
        </ul>
        
      </Form.Group>

      

      {this.membership(memberships,'p1')}

    </Form.Row>
    );
  }
  

	render(){
		return(
			<div>
			
<div className="form">
<Form className="formform" onSubmit={e => this.handleAdd(e)} >
  <Form.Row className="row">
  <Form.Label><h3>Aircraft</h3></Form.Label>

    <Form.Group className="group" controlId="formGridEmail" >
      <Form.Label>Registration</Form.Label>
      <Form.Control placeholder="Tail Number" name="tailNumber" onChange={e => this.handleChange(e)} value={this.state.data["tailNumber"]}/>
    </Form.Group>

    <Form.Group className="group" controlId="formGridPassword">
      <Form.Label>Name</Form.Label>
      <Form.Control placeholder="Name" name="acName" onChange={e => this.handleChange(e)} value={this.state.data["acName"]}/>
    </Form.Group>

  </Form.Row>

  

    
  {this.user('P1','p1',this.clubUsers,this.memberships)}

    

  <Form.Row className="row">
  <Form.Label><h3>P2</h3></Form.Label>

    <Form.Group className="group" controlId="formGridEmail" >
      <Form.Label>First Name</Form.Label>
      <Form.Control placeholder="First Name" name="p2FName" onChange={e => this.handleChange(e)} value={this.state.data["p2FName"]}/>
    </Form.Group>

    <Form.Group className="group" controlId="formGridPassword">
      <Form.Label>Second Name</Form.Label>
      <Form.Control placeholder="Second Name" name="p2LName" onChange={e => this.handleChange(e)} value={this.state.data["p2LName"]}/>
    </Form.Group>

    <Form.Group className="group" controlId="formGridState">
      <Form.Label>.</Form.Label>
      <Form.Control as="select">
        <option>Member</option>
        <option>Tempory Member</option>
        <option>Trial Flight</option>
      </Form.Control>
    </Form.Group>

  </Form.Row>

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
   
  }

  componentWillUnmount(){
    console.log('end logger')
  }
}

export default Logger