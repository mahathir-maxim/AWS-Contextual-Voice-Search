import React, { Component } from 'react';
import axios from 'axios';
import { AttributeList } from '../radio_buttons/AttributeList';
import { CompanyList } from '../radio_buttons/CompanyList';
import { YearList } from '../radio_buttons/YearList';

/*
    The following class takes in user's requested company and requested attribute for prediction,
    and fetches data from AWS Sagemaker via the endpoints in companyList dictionary
*/

class PostRequest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            predictedValue: null,
            userSelection: null,
            companyList: {
                "Alphabet": ['Sales Revenue Net', 'https://obscure-thicket-61096.herokuapp.com/https://srelobtwa0.execute-api.us-east-1.amazonaws.com/test2Alphabet/alphabetrevresource', '{"data":"20210206"}', 'NetIncomeLoss', 'https://obscure-thicket-61096.herokuapp.com/https://1ftar1tina.execute-api.us-east-1.amazonaws.com/testAlphabetNet/alphabetnetapiresource', '{"data":"20221021"}'],
                "Apple": ['Sales Revenue Net', 'https://obscure-thicket-61096.herokuapp.com/https://qsrbxkm9sb.execute-api.us-east-1.amazonaws.com/testApple/applerevresource', '{"data":"20120206"}', 'NetIncomeLoss', 'https://obscure-thicket-61096.herokuapp.com/https://qeoy3025h0.execute-api.us-east-1.amazonaws.com/TestAppleNet/applenetapiresource', '{"data":"20221021"}'],
                "Amazon": ['NetIncomeLoss', 'https://obscure-thicket-61096.herokuapp.com/https://542ebht62f.execute-api.us-east-1.amazonaws.com/TestAmazonNet/amazonnetapiresource', '{"data":"20221021"}'],
                "ATnT": ['Revenue', 'https://obscure-thicket-61096.herokuapp.com/https://2du8kgrp7h.execute-api.us-east-1.amazonaws.com/TestAtnTRev/atntrevresource', '{"data":"20221021"}', 'NetIncomeLoss', 'https://obscure-thicket-61096.herokuapp.com/https://ml7sy252q8.execute-api.us-east-1.amazonaws.com/testATnTNet/atntnetapiresource', '{"data":"20221021"}'],
                "AMD": ['NetIncomeLoss', 'https://obscure-thicket-61096.herokuapp.com/https://ke5s0fv5v9.execute-api.us-east-1.amazonaws.com/testAMDNet/amdnetresource', '{"data":"20221021"}']
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

    forceUpdateHandler(){
        this.forceUpdate();
    };
    
    formSubmit(event) {
        event.preventDefault();
        console.log(this.state.selectedOption)
        this.componentDidMount(this.state.selectedOption)
        this.forceUpdateHandler();
    }

    componentDidMount(event) {
        // Simple POST request with a JSON body using axios
        let arr = [];
        Object.entries(this.state.companyList)
        .map( ([key, value]) => { if (key == event){
            arr = value
        }})
        console.log(arr);

        if (arr[0] == 'Sales Revenue Net'){
            axios.post(
                arr[1],
                arr[2], // This is the body part
                ).then(response => this.setState({ predictedValue: response.data, userSelection: arr[0] }));
                console.log(this.state.data)
                this.forceUpdate(); 
        } else {
            if (arr.length > 3){
                axios.post(
                    arr[4],
                    arr[5], // This is the body part
                    ).then(response => this.setState({ predictedValue: response.data, userSelection: arr[3] }));
                    console.log(this.state.data)
                    this.forceUpdate(); 
            }
        }
    }

    render() {
        const { predictedValue } = this.state;
        const { userSelection } = this.state;
        return (
            <div>
                <div className="card text-center m-3">

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
                        <button className="btn btn-default" type="submit"> &nbsp;
                        Submit ML Search
                        &nbsp; </button>
                    </form>
                    <div><br /></div>

                    Predicted {this.state.userSelection} for 2022: ${(parseInt(predictedValue,  10)/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    <div><br /></div>
                </div>
            </div>
            
        );
    }
}

export { PostRequest }; 