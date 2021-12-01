import React from 'react';
import axios from 'axios';

class PostRequest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            articleId: null
        };
    }

    componentDidMount() {
        // Simple POST request with a JSON body using axios
        const article = {'data':'20120206'};
        axios.post(
            'https://obscure-thicket-61096.herokuapp.com/https://qsrbxkm9sb.execute-api.us-east-1.amazonaws.com/testApple/applerevresource',
            '{"data":"20120206"}', // This is the body part
          ).then(response => this.setState({ articleId: response.data }));
          console.log(this.state.data)
    }

    render() {
        const { articleId } = this.state;
        return (
            <div className="card text-center m-3">
                <h5 className="card-header">Simple POST Request</h5>
                <div className="card-body">
                    Returned Id: {articleId}
                </div>
            </div>
        );
    }
}

export { PostRequest }; 