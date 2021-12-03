import React, { Component } from "react";
import '../dropdown/styles.css';
import companies from '../../utils/companyName_to_cik.json'
import attrb from '../../utils/list.json'

class CompanyList extends Component {

  constructor() {
    super();

    this.state = {
      companyNames: null,
      attributes: null,
      selection: "Value"
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
    this.TextFile();
  }

  TextFile = () => {
    var fs = require('fs');
    fs.writeFile('/test.txt', 'Cool, I can do this in the browser!', function(err) {
      fs.readFile('/test.txt', function(err, contents) {
        console.log(contents.toString());
      });
    });
  }

  componentWillMount(event){
    this.state.companyNames = Object.keys(companies); 
    this.state.attributes = Object.values(attrb);
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