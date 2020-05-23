import React from "react";
import { Link } from "react-router-dom";
import {generateLabels} from "../../helpers"

let LocationCard = ({
    pic = "https://picsum.photos/365/200?random=1",
    title = "Stockholm",
    url = "professional"

}) => {
    return (
        <Link to={"/search-result/" + url} className="studio-item">
            <img className="media-block" src={pic} alt={title} />
            <div className="content-block">
                <h3 className="title-block uppercase">{generateLabels(url)}</h3>
            </div>
        </Link>
    );
};

export default LocationCard;
