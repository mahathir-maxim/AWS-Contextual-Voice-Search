import React, { Component, useState } from "react";
import '../dropdown/styles.css';
import attrb from '../../utils/list.json'

class AttributeList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      attributes: null
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
    this.componentDidMount(this.state.selectedOption)
  }

  componentWillMount(){
    this.state.attributes = Object.values(attrb);
  }

  componentDidMount(event){
    console.log(event);
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
            <strong> Selected option is : <div><br /></div> {this.state.selectedOption} </strong>
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