import React, { Component } from "react";
import '../dropdown/styles.css';
import companies from '../../utils/companyName_to_cik.json'
import { GetSearch } from "../get_search/GetSearch";

class CompanyList extends Component {

  constructor() {
    super();

    this.state = {
      companyNames: null,
      companyToCik: null,
      companySelection: "Value"
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
    this.state.companySelection = this.state.selectedOption;
  }

  componentWillMount(event){
    this.state.companyNames = Object.keys(companies); 
    this.state.companyToCik = new Map(Object.entries(companies)); 
    this.state.example = this.state.companyToCik.get(this.state.selectedOption);
  }

  componentDidMount(event){
    console.log(event);
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
            <strong> Selected option is : <div><br /></div> {this.state.selectedOption} <div><br /></div> </strong>
          </div>
          <button className="btn btn-default" type="submit">
            Submit
          </button>
          {this.state.example}
        </form>
        
      </div>
    );
  }
}

export { CompanyList };