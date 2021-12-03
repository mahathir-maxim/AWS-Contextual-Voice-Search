import React, { Component } from "react";
import '../dropdown/styles.css';
import companies from '../../utils/companyName_to_cik.json'
import attrb from '../../utils/list.json'

class CompanyList extends React.Component{

  constructor(props) {
    super(props);


    this.state = {
      companyNames: null,
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
    console.log(this.state.selectedOption)
    this.componentDidMount(this.state.selectedOption)
  }

  componentWillMount(){
    this.state.companyNames = Object.keys(companies); 
    this.state.attributes = Object.values(attrb);
  }

  componentDidMount(event){

  }

  render() {
    
    return (
      <div class="card text-right">
        <form class="card text-right" onSubmit={this.formSubmit}>

          {this.state.companyNames.map((company) => (
            <div className="radio">
              <label>
                  <input
                  type="radio"
                  value={company}
                  onChange={this.onValueChange}
                  checked={this.state.selectedOption == company}
                  />
                  {company}
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

export { CompanyList };