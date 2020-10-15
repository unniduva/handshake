import React from "react";
import { Link } from "react-router-dom";
import { generateLabels } from "../../helpers"

let LocationCard = ({
    pic = {
        webp: "https://picsum.photos/365/200?random=1",
        png: "https://picsum.photos/365/200?random=1"
    },
    title = "Stockholm",
    url = "professional"

}) => {
    return (
        <Link to={"/search-result/" + url} className="studio-item">
            <picture className="media-block">
                <source srcSet={pic.webp} type="image/webp" alt={title} />
                <img src={pic.png} alt={title} />
            </picture>
            <div className="content-block">
                <h3 className="title-block uppercase">{generateLabels(url)}</h3>
            </div>
        </Link>
    );
};

export default LocationCard;
