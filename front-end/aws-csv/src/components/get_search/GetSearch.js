import React, { useEffect, useState } from "react";
import OutputTable from '../Table/table.js';

class GetSearch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            companyName: sessionStorage.getItem("Company Name"),
            companyCik: sessionStorage.getItem("Company CIK"),
            attribute: sessionStorage.getItem("Selected Attribute"),
            year: sessionStorage.getItem("Selected Year"),
            results: null
        }
    }

    handleValidation() {
        if (this.state.companyName == null || this.state.companyName == 'undefined' ||
            sessionStorage.getItem("Company Name") == null || 
            sessionStorage.getItem("Company Name") == 'undefined' ||
            sessionStorage.getItem("Company CIK") == null || 
            sessionStorage.getItem("Company CIK") == 'undefined')
        {
            alert("Choose a valid Company!");
            return false
        }
        if (this.state.attribute == null || this.state.attribute == 'undefined' ||
        sessionStorage.getItem("Selected Attribute") == null || 
        sessionStorage.getItem("Selected Attribute") == 'undefined')
        {
            alert("Choose a valid Attribute!");
            return false
        }
        if (this.state.year == null || this.state.year == 'undefined' ||
        sessionStorage.getItem("Selected Year") == null || 
        sessionStorage.getItem("Selected Year") == 'undefined')
        {
            alert("Choose a valid Year!");
            return false
        }
        alert("Your choices look good!");
        return true;
    }

    render(){
        return(
            <div>
                <div>
                    <p> Chosen Company: {this.state.companyName} </p>
                    <p> Corresponding CIK: {this.state.companyCik} </p>
                    <p> Chosen Attribute: {this.state.attribute} </p>
                    <p> Chosen Year: {this.state.year} </p>
                    <br></br>
                </div>
                <div>
                    <button onClick={() => window.location.reload(false)}> &nbsp; Update Choices &nbsp; </button>
                    &emsp;&emsp;
                    <button onClick={() => this.handleValidation()}> &nbsp; Validate Choices &nbsp; </button>
                    <SubmitSearch 
                        companyCik={this.state.companyCik}
                        attribute={this.state.attribute ? this.state.attribute.replace(/\s/g, ''): undefined}
                        year={this.state.year}
                    />
                </div>
            </div>
        )
    }
}

function SubmitSearch(props) {

    const [visible, setVisible] = useState(false);
    const [companyData, setCompanyData] = useState([])

    // Important Test
    // console.log("/" + props.companyCik + "/" + props.attribute + "/" +
    //     props.year);

    // Fetch from python server
    useEffect(() => {
        fetch("/" + props.companyCik + "/" + props.attribute + "/" +
        props.year).then(response =>
            response.json().then(data => {
                setCompanyData(data);
            })
        );
    
    }, []);

    return (         
        <div>
            <button onClick={() => setVisible(!visible)}>
            {visible ? 'Submit GET Search' : 'Submit GET Search'}
            </button>
            {visible && <OutputTable data={companyData}/> }
        </div>
    );
 }

export { GetSearch }; 