import React, { Component } from "react";
import { Result, Button } from "antd";

class NotFound extends Component {
    render() {
        const  {history} = this.props;
        return (
            <main className="main-inner-wrapper">  
                <div className="container"> 
                    <Result
                        status="404"
                        title="404"
                        subTitle="Sorry, the page you visited does not exist."
                        extra={<Button onClick={() => history.push("/home")} className="secondary-btn">Back Home</Button>}
                    />
                </div>
            </main>
        );
    }
}

export default NotFound;

