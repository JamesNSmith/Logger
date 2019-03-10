import React from "react"

import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

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

		window.flightControllerDependents['table'] = this
    	console.log(flightControllerDependents)
		

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
			launchFee:'4.50',
			soaringFee:'0.15'
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
			launchFee:'4.50',
			soaringFee:'0.15'
  		},{
  			flightNumber:'3',
  			tailNumber:'TUG',
			acName:'Puchacz',
			p1FName:'Jack',
			p1LName:'Smith',
			p2FName:'Jack',
			p2LName:'Bing',
			launchFee:'4.50',
			soaringFee:'0.15'
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
	timeSquare(name,time,btnImagePath){
		var timeFormat = (time) => {
			const timeDate = new Date(time);
			var hours = timeDate.getHours()
			var minutes = timeDate.getMinutes()

			if(minutes < 10){
				minutes = "0" + minutes;
			}

			return (hours + ' : ' +minutes);
		};

		if(time != ''){
			return(<li>{timeFormat(time)}</li>);
		} else {
			return(	
				<InputGroup className="mb-3">
				<FormControl
     			  	placeholder={name + '   (hh:mm)'} 
      			  	aria-label={name}
      			  	aria-describedby={name}
    			/>
				<InputGroup.Append>
      			  	<Button variant="outline-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d={btnImagePath}/></svg></Button>
    			</InputGroup.Append>
  				</InputGroup>
  			);
		}
		
	}

	row(data){
		if(!data){
  			return (<tr key = "last"><td colspan="100%" height="60"></td></tr>)
		}

		const launchClock = 'M13 12l-.688-4h-.609l-.703 4c-.596.347-1 .984-1 1.723 0 1.104.896 2 2 2s2-.896 2-2c0-.739-.404-1.376-1-1.723zm-1-8c-5.522 0-10 4.477-10 10s4.478 10 10 10 10-4.477 10-10-4.478-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-2-19.819v-2.181h4v2.181c-1.438-.243-2.592-.238-4 0zm9.179 2.226l1.407-1.407 1.414 1.414-1.321 1.321c-.462-.484-.964-.926-1.5-1.328z'
		const landClock = 'M22 14c0 5.523-4.478 10-10 10s-10-4.477-10-10 4.478-10 10-10 10 4.477 10 10zm-2 0c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8 8-3.589 8-8zm-6-11.819v-2.181h-4v2.181c1.408-.238 2.562-.243 4 0zm6.679 3.554l1.321-1.321-1.414-1.414-1.407 1.407c.536.402 1.038.844 1.5 1.328zm-8.679 2.265v6h6c0-3.309-2.691-6-6-6z'

		return(
			<tr key = {data['indexNumber']}>
			<td><li>{data['indexNumber']}</li></td>
			<td><li>{data['tailNumber']}</li><li>{data['acName']}</li></td>
			<td><li>{data['p1Username']}</li><li>{data['p1FName']}</li><li>{data['p1LName']}</li></td>
			<td><li>{data['p2Username']}</li><li>{data['p2FName']}</li><li>{data['p2LName']}</li></td>
			<td style={{width:"300px"}}>{this.timeSquare('Launch Time',data['launchTime'],launchClock)}{this.timeSquare('Land Time',data['landTime'],landClock)}</td>
			<td><li>{data['launchFee']}</li><li>{data['soaringFee']}</li></td>
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
			<tbody key="t1"id="tableBody">
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

		var getHandler = function(data){
    		console.log('exit get range:',data)
    		addDataTable(data)
  		}
  		console.log('run stop');
  		//this.flightController.tableReady(getHandler)
  		//this.database.getRecordAll('flights',getHandler);
  		//this.database.getRecordRange('flights',"flightNumber",[1,11],getRangeHandler);
	}
	
}

export default TableLog
