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
		//this.clickHandler = this.clickHandler.bind(this);
		//this.clickHandlert = this.clickHandlert.bind(this);

		//this.addData = this.addData.bind(this);
		this.addDataTable = this.addDataTable.bind(this);
		this.clearData = this.clearData.bind(this);

		this.timeTextHandler = this.timeTextHandler.bind(this);
		this.timeButtonHandler = this.timeButtonHandler.bind(this);

		//this.props.getFunctions.push(this.addData);

		window.flightControllerDependents['table'] = this
    	console.log(flightControllerDependents)
		
    	this.input = {}
		this.state = {
			tableData:{},
			inputData:{}
		}
		
	}

//helpers ---------------------------------
	timeFormat(time){
		if(time == ''){
			return ''
		}

		const timeDate = new Date(time);
		var hours = timeDate.getHours()
		var minutes = timeDate.getMinutes()

		if(minutes < 10){
			minutes = "0" + minutes;
		}

		return (hours + ' : ' +minutes);
	}

	defaultData(){ // not sure -----------------------------
		var aircraftObj = {id:'',registration:'',acName:''}
    	var userObj = {userId:'',username:'',fName:'',lName:'',membershipId:'',launchFee:'',soaringFee:'',aerotowStandardFee:'',aerotowUnitFee:''}
		
		var data = {
        user:'',//Info
        date:'', 
        club:'',

        aircraft:JSON.parse(JSON.stringify(this.aircraftObj)),
		tug:JSON.parse(JSON.stringify(this.aircraftObj)),
        
        launchType:'',
        releaseHeight:'',

        p1:JSON.parse(JSON.stringify(this.userObj)),
        p2:JSON.parse(JSON.stringify(this.userObj)),

        payee:'',//payment
        aerotowStandardFee:'',//aerotow
        aerotowUnitFee:'',
        aerotowLaunchFee:'',
		launchFee:'', //winch
		soaringFee:'',
        launchTime:'',//time
        landTime:'',
        //notes:''
		}
	}

	setData(row,nameValue,successHandler = () => {console.log(this.state.data)}){
		console.log(row)
    	console.log(nameValue)
    	const data = this.state.tableData
    	for(var key in nameValue){

    		if(typeof nameValue[key][1] == 'object'){
    			var tierTwo = data[row][nameValue[key][0]]
    			var objTwo = nameValue[key][1]

    			for(var keyTwo in objTwo){
    				tierTwo[objTwo[keyTwo][0]] = objTwo[keyTwo][1]
    			}
    			data[row][nameValue[key][0]] = tierTwo

    		} else {
      			data[row][nameValue[key][0]] = nameValue[key][1]
      		}
    	}
    	this.setState({tableData:data},successHandler());
  	}


//Utils -------------------------------------

	addDataTable(inputData){
		//table
		console.log('add data')
		var tableData = this.state.tableData;
		var returnData //= tableData.concat(inputData);

		//var inpData = this.state.inputData
		for(var count in inputData){

			var formattedLaunchTime = inputData[count]['launchTime']
			var formattedLandTime = inputData[count]['landTime']
			
			if(typeof inputData[count]['launchTime'] != 'object'){//sloppy
				inputData[count]['launchTime'] = {formatted:formattedLaunchTime,input:this.timeFormat(formattedLaunchTime),status:''}
				inputData[count]['landTime'] = {formatted:formattedLandTime,input:this.timeFormat(formattedLandTime),status:''}
			}
			
			if(inputData[count]['launchTime']['formatted'] == ''){
				inputData[count]['launchTime']['status'] = ''
			} else {
				inputData[count]['launchTime']['status'] = 'indexed'
			}

			if(inputData[count]['landTime']['formatted'] == ''){
				inputData[count]['landTime']['status'] = ''
			} else {
				inputData[count]['landTime']['status'] = 'indexed'
			}

			inputData[count]['launchTimeInput']
			inputData[count]['landTimeInput']


			//inputData[count]['notes'] = '' // dodgy -------------------------

			console.log('input')
			console.log(inputData[count])
			tableData[inputData[count]['indexNumber']] = inputData[count]

			
		}

		this.setState({tableData:tableData},console.log('table ready'));
	}

	clearData(){
		this.setState({tableData:[]},console.log('ready'));
	}

	updateData(id,name,time){
		var table = 'flights'
		var timeFormated = time.toISOString()

		this.setData(id,[[name,[['formatted',timeFormated]]]],() => {console.log('updateData ready');console.log(this.state.tableData)})

		window.flightController.tableUpdateTime(table,id,name,timeFormated)
	}

	updateCheckStatus(id,name,success,failure){
		var tableData = this.state.tableData;
		var names = ['launchTime','landTime']
		var ready = false

		console.log(name)
		tableData[id][name]['status'] = 'indexed'

		var readyCount = 0
		for(var key in names){
			if(tableData[id][names[key]]['status'] == 'indexed'){readyCount++}
		}

		console.log(tableData)

		this.setState({tableData:tableData});

		console.log(readyCount)
		console.log(success)
		if(readyCount == 2){
			success(true)
			console.log('true')
		} else {
			console.log('false')
			success(false)
		}
		
	}

	updateTableData(id,columnValues,success,failure){
		console.log('updateTableData')
		console.log(columnValues)

		this.setData(id,columnValues,success)
	}

	
//handlers ----------------------------------

	/*clickHandler(){
		console.log('click handler');
		this.addData(this.extraData);
	}*/

	/*clickHandlert(){
		console.log('click handler');
		this.clearData();
	}*/

	timeTextHandler(event) {
		const {id,name,value} = event.target

		this.setData(id,[[name,[['input',value]]]])

		if(value.length == 5){
			console.log('validate')

			var valHour = value.slice(0,2);
			var valColon = value[2];
			var valMinute = value.slice(3,5);

			var hour = false
			var colon = false
			var minute = false

			for(var count = 0;count<24;count++){
				var compareVal = count.toString()
				if (compareVal.length < 2){
					compareVal = '0' + compareVal
				}
				if(valHour == compareVal){
					hour = true
					break;
				}
			}

			if(valColon == ':'){ // needs improvement
				colon = true
			} 

			for(var count = 0;count<60;count++){
				var compareVal = count.toString()
				if (compareVal.length < 2){
					compareVal = '0' + compareVal
				}
				if(valMinute == compareVal){
					minute = true
					break;
				}
			}

			if(hour && colon && minute){
				console.log('success')
				var time = new Date()
				time.setHours(parseInt(valHour))
				time.setMinutes(parseInt(valMinute))
				time.setSeconds(0)
				time.setMilliseconds(0)

				this.updateData(parseInt(id),name,time)

			} else {
				console.log('error')
			}
		}			
		
	}

	timeButtonHandler(id,name) {
		var time = new Date()
		time.setSeconds(0)
		time.setMilliseconds(0)
		console.log(time)

		this.setData(id,[[name,[['input',this.timeFormat(time)]]]])

		this.updateData(id,name,time)
	}

//constructors ------------------------------
	timeSquare(index,name,mesg,time,btnImagePath){
		var buttonHandler = (event) =>{
			this.timeButtonHandler(index,name)
		}

		if(this.state.tableData[index]['launchTime']['status'] == 'indexed' && this.state.tableData[index]['landTime']['status'] == 'indexed'){
			return(<ul className = "td"><li>{this.timeFormat(time)}</li></ul>);
		} else {
			return(	
				<InputGroup className="mb-3">
				<FormControl
     			  	placeholder={mesg + ' - 24(hh:mm)'} 
      			  	aria-label={name}
      			  	aria-describedby={name}
      			  	maxLength={5}
      			  	onChange={this.timeTextHandler}
      			  	name={name}
      			  	id={index}
      			  	value={this.state.tableData[index][name]['input']}
    			/>
				<InputGroup.Append>
      			  	<Button 
      			  	variant="outline-secondary" 
      			  	onClick={buttonHandler}
      			  	>
      			  	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d={btnImagePath}/></svg>
      			  	</Button>
    			</InputGroup.Append>
  				</InputGroup>
  			);
		}
		
	}

	row(data){
		if(!data){
  			return (<tr key = "last"><td colSpan="100%" height="60"></td></tr>)
		}

		const launchClock = 'M13 12l-.688-4h-.609l-.703 4c-.596.347-1 .984-1 1.723 0 1.104.896 2 2 2s2-.896 2-2c0-.739-.404-1.376-1-1.723zm-1-8c-5.522 0-10 4.477-10 10s4.478 10 10 10 10-4.477 10-10-4.478-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-2-19.819v-2.181h4v2.181c-1.438-.243-2.592-.238-4 0zm9.179 2.226l1.407-1.407 1.414 1.414-1.321 1.321c-.462-.484-.964-.926-1.5-1.328z'
		const landClock = 'M22 14c0 5.523-4.478 10-10 10s-10-4.477-10-10 4.478-10 10-10 10 4.477 10 10zm-2 0c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8 8-3.589 8-8zm-6-11.819v-2.181h-4v2.181c1.408-.238 2.562-.243 4 0zm6.679 3.554l1.321-1.321-1.414-1.414-1.407 1.407c.536.402 1.038.844 1.5 1.328zm-8.679 2.265v6h6c0-3.309-2.691-6-6-6z'

		return(
			<tr key = {data['indexNumber']}>
			<td><ul className = "td"><li>{data['indexNumber']}</li><li>{data['flightNumber']}</li></ul></td>
			<td><ul className = "td"><li>{data['aircraft']['registration']}</li><li>{data['aircraft']['acName']}</li></ul></td>
			<td><ul className = "td"><li>{data['p1']['username']}</li><li>{data['p1']['fName']}</li><li>{data['p1']['lName']}</li></ul></td>
			<td><ul className = "td"><li>{data['p2']['username']}</li><li>{data['p2']['fName']}</li><li>{data['p2']['lName']}</li></ul></td>
			<td style={{width:"300px"}}>{this.timeSquare(data['indexNumber'],'launchTime','Launch Time',data['launchTime']['formatted'],launchClock)}{this.timeSquare(data['indexNumber'],'landTime','Land Time',data['landTime']['formatted'],landClock)}<ul className = "td"><li>{data['flightTime']}</li></ul></td>
			<td><ul className = "td"><li>{data['launchFee']}</li><li>{data['soaringFee']}</li><li>{data['soaringTotal']}</li></ul></td>
			<td><ul className = "td"><li>{data['total']}</li></ul></td>
			<td><Button variant="outline-info">Edit Times</Button></td>
			</tr>
		);
	}

	body(tableData){
		const rows = [];
		var keys = Object.keys(tableData)
		keys.sort((a, b) => b - a)

		for(var key in keys){
			var row = this.row(tableData[keys[key]])
			rows.push(row)
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
					<th>#</th>
					<th>Aircraft</th>
					<th>P1</th>
					<th>P2</th>
					<th>Flight</th>
					<th colSpan="2">Fee</th>
					<th></th>
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
