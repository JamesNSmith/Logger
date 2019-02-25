import React from "react"
import PropTypes from "prop-types"

class box extends React.Component {
	constructor(props){
		super(props);
	}

	
}

class Logger extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<table>
				<tr>
					<th>#</th>
					<th>P1</th>
					<th>P2</th>
					<th>Flight</th>
					<th colSpan="2">Accounting</th>
				</tr>
				<tr>
					<td>
						<input className="disabled" type="text" size ="2" maxLength="3"/>
					</td>
					<td><input id="imps:t" type='text' placeholder="First Name" size="10"/>
						<input id="imps:b" type='text' placeholder="Second Name" size="10"/>
					</td>
					<td><input id="imp2:t" type='text' placeholder="First Name"size="10"/>
						<input id="imp2:b" type='text' placeholder="Second Name" size="10"/>
					</td>
					<td><input id="imp3:t" type='time' placeholder="Launch"/>
						<input id="imp3:1" type='time' placeholder="Land" />
						<input id="imp3:b" type='time' placeholder="Flight Time" />
					</td>
					<td><input id="impl:t" type='text' placeholder="Launch Fee" size="10"/>
						<input id="impl:1" type='text' placeholder="Soaring Fee" size="10"/>
						<input id="impl:1" type='text' placeholder="Soaring Total" size="10"/>
					</td>
					<td>
						<input id="impl:b" type='text' placeholder="total" size="10"/>
					</td>
					

				</tr>


			</table>

		);
	}

}

class table extends React.Component {

}

class FlightLogger extends React.Component {
  constructor(props){
  	super(props);

  	this.key = {
  		P1:{
  			first_name:'',
  			last_name:''
  		},
  		P2:{
  			first_name:'',
  			last_name:''
  		}

  	}
  }

  render () {
  	console.log('ss')
    return (
      <React.Fragment>
        <Logger/>
      </React.Fragment>
    );
  }
}

FlightLogger.propTypes = {
  greeting: PropTypes.string
};
export default FlightLogger
