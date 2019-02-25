import React from "react"
import PropTypes from "prop-types"
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'

import TableLog from './TableLog'
import Logger from './Logger'

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
//IndexedDB ---------------------------------

  database(){
	if (!('indexedDB' in window)) {
  	  console.log('This browser doesn\'t support IndexedDB');
  	  return;
	}
	console.log('databse')

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

	this.database()
  }

}

/*FlightLogger.propTypes = {
  greeting: PropTypes.string
};
*/
export default FlightLogger
