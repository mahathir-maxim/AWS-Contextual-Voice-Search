import React, { Component, useState } from "react";
import '../dropdown/styles.css';
import years from '../../utils/years.json'

class YearList extends Component {

  constructor(props) {
    super(props);

    this.state = {
        yearList: null,
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
    this.componentDidMount(this.state.selectedOption)
  }

  componentWillMount(){
    this.state.yearList = Object.values(years);
  }

  componentDidMount(event){
    this.state.selection = event
    console.log(this.state.selection);
      
  }

  render() {
    
    return (
      <div class="card text-right">
        <form class="card text-right" onSubmit={this.formSubmit}>

          {this.state.yearList.map((year) => (
            <div className="radio">
              <label>
                  <input
                  type="radio"
                  value={year}
                  onChange={this.onValueChange}
                  checked={this.state.selectedOption == year}
                  />
                  {year}
              </label>
              <div><br /></div>
            </div>
          ))}

          <div>
            Selected option is : {this.state.selectedOption}
          </div>
          <button className="btn btn-default" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export { YearList };