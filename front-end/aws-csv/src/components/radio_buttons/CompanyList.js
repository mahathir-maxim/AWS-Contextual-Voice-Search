import React, { Component } from "react";
import '../dropdown/styles.css';
import companies from '../../utils/companyName_to_cik.json';

// Spawn list of companies and get user's selection

class CompanyList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      companyNames: null,
      companyToCik: null,
      companySelection: "No Value Selected!",
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
    this.state.companySelection = this.state.selectedOption;
    this.onValueChange(event);
    sessionStorage.setItem('Company Name', this.state.companySelection);
    sessionStorage.setItem('Company CIK', this.state.companyToCik.get(this.state.companySelection));
  }

  componentWillMount(event){
    this.state.companyNames = Object.keys(companies);
    this.state.companyNames.sort(); 
    this.state.companyToCik = new Map(Object.entries(companies)); 
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
            <strong> 
              Selected option is : <div><br /></div> {sessionStorage.getItem('Company Name')} &nbsp;
              with cik: &nbsp; {sessionStorage.getItem('Company CIK')}<div><br /></div> 
            </strong>
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