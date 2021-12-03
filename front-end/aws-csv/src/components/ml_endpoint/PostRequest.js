import React, { Component } from 'react';
import axios from 'axios';
import { AttributeList } from '../radio_buttons/AttributeList';
import { CompanyList } from '../radio_buttons/CompanyList';
import { YearList } from '../radio_buttons/YearList';

class PostRequest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            predictedValue: null,
            userCompany: null,
            userAttribute: null,
            companyList: {
                Alphabet: ['Sales Revenue Net', 'https://obscure-thicket-61096.herokuapp.com/https://srelobtwa0.execute-api.us-east-1.amazonaws.com/test2Alphabet/alphabetrevresource', '{"data":"20210206"}'],
                Apple: ['Sales Revenue Net', 'https://obscure-thicket-61096.herokuapp.com/https://qsrbxkm9sb.execute-api.us-east-1.amazonaws.com/testApple/applerevresource', '{"data":"20120206"}']
            },
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

    callbackFunction = (companyChoice) => {
        this.setState({userCompany: companyChoice})
    }
  

    componentDidMount(event) {
        // Simple POST request with a JSON body using axios
        if (event == "Apple"){
            axios.post(
                this.state.companyList.Apple[1],
                this.state.companyList.Apple[2], // This is the body part
              ).then(response => this.setState({ predictedValue: response.data, userSelection: this.state.companyList.Apple[0] }));
              console.log(this.state.data)
              this.forceUpdate();
        } else {
            axios.post(
                this.state.companyList.Alphabet[1],
                this.state.companyList.Alphabet[2], // This is the body part
              ).then(response => this.setState({ predictedValue: response.data, userSelection: this.state.companyList.Alphabet[0] }));
              console.log(this.state.data)
              this.forceUpdate();
        }
    }

    render() {
        const { predictedValue } = this.state;
        return (
            <div>
                <div className="card text-center m-3">
                    <h5 className="card-header">Choose desired company's predicted value</h5>

                    <div><br /></div>
                    <form onSubmit={this.formSubmit}>
                        <div className="radio">
                        <label>
                            <input
                            type="radio"
                            value="Alphabet"
                            checked={this.state.selectedOption === "Alphabet"}
                            onChange={this.onValueChange}
                            />
                            Alphabet
                        </label>
                        <div><br /></div>
                        </div>
                        <div className="radio">
                        <label>
                            <input
                            type="radio"
                            value="Apple"
                            checked={this.state.selectedOption === "Apple"}
                            onChange={this.onValueChange}
                            />
                            Apple
                        </label>
                        <div><br /></div>
                        </div>
                        <div>
                        Selected option is : {this.state.selectedOption}
                        </div>
                        <div><br /></div>
                        <button className="btn btn-default" type="submit">
                        Submit
                        </button>
                    </form>
                    <div><br /></div>

                    Predicted {this.state.userCompany} for 2022: ${(parseInt(predictedValue,  10)/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>

                {/* <div>
                    <CompanyList parentCallback = {this.callbackFunction}/>
                    <p> {this.state.userCompany} </p>
                </div> */}
            </div>

        );
    }
}

export { PostRequest }; 