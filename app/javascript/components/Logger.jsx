import React from "react"
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import FlightController from '../utilities/flightController'



class Logger extends React.Component {
	constructor(props){
		super(props);
		//this.props.addDataRow();
		console.log(this.props.addDataRow)
		//console.log(this.props.addDataRow({}))

		//this.handleAdd = this.handleAdd.bind(this);

    window.flightControllerDependents['logger'] = this
		
    this.state = {
			data:{
				tailNumber:'',
				acName:'',
				p1FName:'',
				p1LName:'',
				p2FName:'',
				p2LName:'',
				lFee:'',
				sFee:''
			}
		}
	}

  clear(){
    console.log('clear')
    const data = this.state.data
    for(var line in data){
      data[line] = ''
    }
    this.setState({data:data});
  }
//coms -------------------------------------
  message(){
    console.log('Logger')
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
		this.setState({data:data});

		console.log(this.state.data);	
	}

	handleClear(event){
		this.clear()
	}

//constructor ---------------------------------

	render(){
		return(
			<div>
			
<div className="form">
<Form className="formform" onSubmit={e => this.handleAdd(e)}>
  <Form.Row className="row">
  <Form.Label><h3>Aircraft</h3></Form.Label>

    <Form.Group className="group" controlId="formGridEmail" >
      <Form.Label>Tail Number</Form.Label>
      <Form.Control placeholder="Tail Number" name="tailNumber" onChange={e => this.handleChange(e)} value={this.state.data["tailNumber"]}/>
    </Form.Group>

    <Form.Group className="group" controlId="formGridPassword">
      <Form.Label>Name</Form.Label>
      <Form.Control placeholder="Name" name="acName" onChange={e => this.handleChange(e)} value={this.state.data["acName"]}/>
    </Form.Group>

  </Form.Row>

  <Form.Row className="row">
  <Form.Label><h3>P1</h3></Form.Label>

  	<Form.Group className="group" controlId="formGridState">
  	  <Form.Label>.</Form.Label>
      <Form.Control as="select" >
        <option>Member</option>
        <option>Tempory Member</option>
        <option>Trial Flight</option>
      </Form.Control>
    </Form.Group>

    <Form.Group className="group" controlId="formGridEmail" >
      <Form.Label>First Name</Form.Label>
      <Form.Control placeholder="First Name" name="p1FName" onChange={e => this.handleChange(e)} value={this.state.data["p1FName"]}/>
    </Form.Group>

    <Form.Group className="group" controlId="formGridPassword">
      <Form.Label>Second Name</Form.Label>
      <Form.Control placeholder="Second Name" name="p1LName" onChange={e => this.handleChange(e)} value={this.state.data["p1LName"]}/>
    </Form.Group>

  </Form.Row>

  <Form.Row className="row">
  <Form.Label><h3>P2</h3></Form.Label>

  	<Form.Group className="group" controlId="formGridState">
  	  <Form.Label>.</Form.Label>
      <Form.Control as="select">
        <option>Member</option>
        <option>Tempory Member</option>
        <option>Trial Flight</option>
      </Form.Control>
    </Form.Group>

    <Form.Group className="group" controlId="formGridEmail" >
      <Form.Label>First Name</Form.Label>
      <Form.Control placeholder="First Name" name="p2FName" onChange={e => this.handleChange(e)} value={this.state.data["p2FName"]}/>
    </Form.Group>

    <Form.Group className="group" controlId="formGridPassword">
      <Form.Label>Second Name</Form.Label>
      <Form.Control placeholder="Second Name" name="p2LName" onChange={e => this.handleChange(e)} value={this.state.data["p2LName"]}/>
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
      <Form.Control placeholder="Launch Fee" name="lFee" onChange={e => this.handleChange(e)} value={this.state.data["lFee"]}/>
    </Form.Group>

    <Form.Group className="group" controlId="formGridPassword" >
      <Form.Label>Soaring Fee</Form.Label>
      <Form.Control placeholder="Soaring Fee" name="sFee" onChange={e => this.handleChange(e)} value={this.state.data["sFee"]}/>
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
   
  }
}

export default Logger