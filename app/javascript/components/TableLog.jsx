import React from "react"
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Database from '../utilities/indexedDB'
import FlightController from '../utilities/flightController'



class TableLog extends React.Component {
	constructor(props){
		super(props);
		this.clickHandler = this.clickHandler.bind(this);
		this.clickHandlert = this.clickHandlert.bind(this);

		this.addData = this.addData.bind(this);
		this.addDataTable = this.addDataTable.bind(this);
		this.clearData = this.clearData.bind(this);

		this.props.getFunctions.push(this.addData);
		

		this.state = {
			tableData:[]
		}

		/*{
  			flightNumber:'1',
  			tailNumber:'YUG',
			acName:'Puchacz',
			p1FName:'John',
			p1LName:'Smith',
			p2FName:'Jack',
			p2LName:'Bing',
			lFee:'4.50',
			sFee:'0.15'
  		}
  		*/

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

  		this.database
		
	}

//Utils -------------------------------------

	addDataTable(inputData){
		//table
		console.log('add data')
		const tableData = this.state.tableData;
		const returnData = tableData.concat(inputData);
		console.log(returnData);

		this.setState({tableData:returnData},console.log('ready'));
	}

	addData(inputData){
		var addDataTable = this.addDataTable
		var database = this.database //-----------------------------------------------------

		console.log('inputData:')
		console.log(inputData)

		this.database.countRecords('flights',function(result){ //---------------------------------
			inputData['flightNumber'] = result+1
			console.log(inputData)
			addDataTable(inputData)
			database.addData('flights',[inputData]) //---------------------------------
		});
		
	}

	clearData(){
		this.setState({tableData:[]},console.log('ready'));
	}

//coms -------------------------------------
	message(){
		console.log('TableLog')
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
		var addDataTable = this.addDataTable
		console.log('did mount')

		//this.database = new Database('flightLogger'); //---------------------------------
		this.flightController = new FlightController(['table',this])

		var getHandler = function(data){
    		console.log('exit get range:',data)
    		addDataTable(data)
  		}
  		console.log('run stop');
  		this.database.getRecordAll('flights',getHandler);
  		//this.database.getRecordRange('flights',"flightNumber",[1,11],getRangeHandler);
	}
	
}

export default TableLog
