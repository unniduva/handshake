import React, { Component } from "react";

class Nodata extends Component {
    render() {
        return (
            <div className="no-data-block">
                <img className="image" src='/images/nodata.jpeg' alt="No Data Found"></img>
            </div>
        );
    }
}

export default Nodata;