import React, { Component, useState } from "react";
import '../dropdown/styles.css';
import attrb from '../../utils/list.json'

// Spawn list of attributes and get user's selection

class AttributeList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      attributes: null,
      selection: null
    };

    this.onValueChange = this.onValueChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }

  formSubmit(event) {
    event.preventDefault();
    this.state.selection = this.state.selectedOption;
    sessionStorage.setItem('Selected Attribute', this.state.selection);
    this.onValueChange(event);
  }

  componentWillMount(){
    this.state.attributes = Object.values(attrb);
  }

  render() {
    
    return (
      <div class="card text-right">
        <form class="card text-right" onSubmit={this.formSubmit}>

          {this.state.attributes.map((eachAttrb) => (
            eachAttrb = eachAttrb.replace(/([A-Z])/g, ' $1').trim(),
            <div className="radio">
              <label>
                  <input
                  type="radio"
                  value={eachAttrb}
                  onChange={this.onValueChange}
                  checked={this.state.selectedOption == eachAttrb}
                  />
                  {eachAttrb}
              </label>
              <div><br /></div>
            </div>
          ))}

          <div>
            <strong> Selected option is : <div><br /></div> {sessionStorage.getItem('Selected Attribute')} </strong>
          </div>
          <div><br /></div>
          <button className="btn btn-default" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export { AttributeList };