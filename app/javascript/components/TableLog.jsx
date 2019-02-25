import React from "react"
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class TableLog extends React.Component {
	constructor(props){
		super(props);
		this.clickHandler = this.clickHandler.bind(this);
		this.clickHandlert = this.clickHandlert.bind(this);

		this.addData = this.addData.bind(this);
		this.clearData = this.clearData.bind(this);

		this.props.getFunctions.push(this.addData);
		

		this.state = {
			tableData:[{
  			flightNumber:'1',
  			tailNumber:'YUG',
			acName:'Puchacz',
			p1FName:'John',
			p1LName:'Smith',
			p2FName:'Jack',
			p2LName:'Bing',
			lFee:'4.50',
			sFee:'0.15'
  		}]}

  		this.extraData = [{
  			flightNumber:'2',
  			tailNumber:'TUG',
			acName:'Puchacz',
			p1FName:'Jack',
			p1LName:'Smith',
			p2FName:'Jack',
			p2LName:'Bing',
			lFee:'4.50',
			sFee:'0.15'
  		},{
  			flightNumber:'3',
  			tailNumber:'TUG',
			acName:'Puchacz',
			p1FName:'Jack',
			p1LName:'Smith',
			p2FName:'Jack',
			p2LName:'Bing',
			lFee:'4.50',
			sFee:'0.15'
  		}]


		
	}

//Utils -------------------------------------

	addData(inputData){
		console.log('add data')
		const tableData = this.state.tableData;
		const returnData = tableData.concat(inputData);
		console.log(returnData);

		this.setState({tableData:returnData},console.log('ready'));
	}

	clearData(){
		this.setState({tableData:[]},console.log('ready'));
	}


//handlers ----------------------------------

	clickHandler(){
		console.log('click handler');
		this.addData(this.extraData);
	}

	clickHandlert(){
		console.log('click handler');
		this.clearData();
	}

//constructors ------------------------------

	row(data){
		if(!data){
			data = {
  			flightNumber:'',
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
		return(
			<tr>
			<td><li>{data['flightNumber']}</li></td>
			<td><li>{data['tailNumber']}</li><li>{data['acName']}</li></td>
			<td><li>{data['p1FName']}</li><li>{data['p1LName']}</li></td>
			<td><li>{data['p2FName']}</li><li>{data['p2LName']}</li></td>
			<td><li>{data['lFee']}</li><li>{data['sFee']}</li></td>
			<td></td>
			</tr>
		);
	}

	body(tableData){
		const rows = [];
		var count=0
		while (count<tableData.length){
			var row = this.row(tableData[tableData.length - count - 1])
			rows.push(row)
			count++
		}
		rows.push(this.row())

		return (
			<tbody id="tableBody">
			{rows}
			</tbody>
		);
	}


	componentWillUpdate(){
		console.log('will update')
	}

	render(){
		console.log('uio')
		return(
		<div className="table">
		<Table striped bordered hover size="sm">
			<thead>
				<tr>
					<th onClick={this.clickHandler}>#</th>
					<th>Aircraft</th>
					<th onClick={this.clickHandlert}>P1</th>
					<th>P2</th>
					<th>Flight</th>
					<th colSpan="2">Fee</th>
				</tr>
			</thead>
			{this.body(this.state.tableData)}
		</Table>
		</div>
		);
	}

	componentDidMount(){
		console.log('did mount')
	}
	
}

export default TableLog