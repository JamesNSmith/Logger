import React from "react"
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'

import FlightController from '../utilities/flightController'

/*class CustomToggle extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    this.props.onClick(e);
  }

  render() {
    return (
      {this.props.children}
    );
  }
}
*/

class Logger extends React.Component {
	constructor(props){
		super(props);
		//this.props.addDataRow();
		//console.log(this.props.addDataRow)
		//console.log(this.props.addDataRow({}))

		//this.handleAdd = this.handleAdd.bind(this);

    window.flightControllerDependents['logger'] = this

    this.memberships = window.memberships
		
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
			}
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

  setMembership(membership,user){
    const data = this.state.data

    data[user+'MembershipId'] = membership['id']
    data[user+'LaunchFee'] = membership['launchFee']
    data[user+'SoaringFee'] = membership['soaringFee']
    console.log(membership)

    this.setState({data:data},() => {console.log('setMembership');console.log(data)});
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

    var handler = (event) => {
      this.membershipHandler(event,memberships,user)
    }

    return(
    <Form.Group className="group" controlId="formGridState">
      <Form.Label>.</Form.Label>
      <Form.Control as="select" onChange={handler} value={this.state.data[user+'MembershipId']}>
        {options()}
      </Form.Control>
    </Form.Group>
    );
  }

  user(title,memberships,user){

    return(
    <Form.Row className="row">
      <Form.Label><h3>{title}</h3></Form.Label>
    
      <Dropdown>
      <Form.Group className="group" controlId="formGridFName" >
        <Form.Label>Name</Form.Label>
        <Dropdown.Toggle>
          <Form.Control placeholder="First Name" name={user+"FName"} onChange={e => this.handleChange(e)} value={this.state.data[user+"FName"]}/>
        </Dropdown.Toggle>
      </Form.Group>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="1">Red</Dropdown.Item>
      </Dropdown.Menu>
      </Dropdown>

      <Form.Group className="group" controlId="formGridSName">
        <Form.Label>Second Name</Form.Label>
        <Form.Control placeholder="Second Name" name={user+"LName"} onChange={e => this.handleChange(e)} value={this.state.data[user+"LName"]}/>
      </Form.Group>

      {this.membership(memberships,'p1')}

    </Form.Row>
    );
  }
  

	render(){
		return(
			<div>
			
<div className="form">
<Form className="formform" onSubmit={e => this.handleAdd(e)}>
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

  

    
  {this.user('P1',this.memberships,'p1')}

    

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
}

export default Logger