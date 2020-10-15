import React, { Component } from "react";
import { connect } from "react-redux";
import {history} from "../../store"

const mapDispatchToProps = ({ user, studio }) => {
    return {
        ...user, ...studio
    };
};

const mapStateToProps = ({ user, studio }) => {
    return {
        ...user, ...studio
    };
};

class LocationCard extends Component {
    handleClick = async () => {
        var { location,  } = this.props
        history.push("/search-result",{location})
        // await this.props.searchOnLoc({ location: location, language: language, from: 0, size: 10 })
    }
    render() {
        var { pic, title, } = this.props
        return (
            <div onClick={this.handleClick} className="studio-item">
                <img className="media-block" src={pic} alt={title} />
                <div className="content-block">
                    <h3 className="title-block uppercase">{title}</h3>
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LocationCard);





















// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// let LocationCard = ({
//     pic = "https://picsum.photos/365/200?random=1",
//     title = "Stockholm",
//     location = { lat: 59.32932349999999, lng: 18.0685808 },
//     language = 'eng'

// }) => {
//     var disFn = useDispatch()
//     return (
//         <div onClick={() => {
//             disFn.studio.getStudioByLocation({ location: location, language: language, from: 0, size: 10 })
//         }} className="studio-item">
//             <img className="media-block" src={pic} alt={title} />
//             <div className="content-block">
//                 <h3 className="title-block uppercase">{title}</h3>
//             </div>
//         </div>
//     );
// };

// export default LocationCard;




// export default LocationCard;