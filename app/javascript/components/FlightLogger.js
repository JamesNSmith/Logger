import React from "react"
import PropTypes from "prop-types"
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'

//import idb from 'idb';
//import { openDb, deleteDb } from 'idb';
//openDb();
//deleteDb();

import TableLog from './TableLog'
import Logger from './Logger'

import Database from '../utilities/indexedDB'


    

class FlightLogger extends React.Component {
  constructor(props){
  	super(props);
	this.functions = [];
	//this.addDataRow = {};

	//this.componentDidMount = this.componentDidMount.bind(this);
	this.update = this.update.bind(this);

  	const keys = [
				'tailNumber',
				'acName',
				'p1FName',
				'p1LName',
				'p2FName',
				'p2LName',
				'lFee',
				'sFee'
			]
  	
  }
  
// Utils -------------------------------------

  update(newData){
  	console.log('update');
  	console.log(newData)
  	this.addDataRow(newData)
  }

//render --------------------------------------
  render() {
    return (
      <React.Fragment>
        <Logger update={this.update}/>
        <br />
        <TableLog getFunctions={this.functions}/>
      </React.Fragment>
    );
  }
	componentDidMount(){
	console.log('flight did mount')
	console.log(this.functions)
	this.addDataRow = this.functions[0]


  /*
  const database = new Database('flightLogger');

  database.deleteData('flights',4);

  var countHandler = function(count){
    console.log('count:', count)
  }
  database.countRecords('flights',countHandler); 

  database.updateRecord('flights',1,{lFee:'5.00'});

  var getHandler = function(data){
    console.log('exit get:',data)
  }
  database.getRecord('flights',1,getHandler);

  var getRangeHandler = function(data){
    console.log('exit get range:',data)
  }
  console.log('run stop')
  database.getRecordRange('flights',"flightNumber",[1,3],getRangeHandler);
  
  /*setTimeout(function(){
    console.log('run Timeout')
    
  },1)*/
  
  }

}

FlightLogger.propTypes = {
  greeting: PropTypes.string
};

export default FlightLogger
