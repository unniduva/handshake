import React from "react";
import { Link } from "react-router-dom";
import {generateLabels} from "../../helpers"

let StudioCard = ({
    id = "5e3b9c7bdec60500045dbe8a01",
    pic = "https://picsum.photos/365/200?random=4",
    title = "The Studio Flamingo",
    price = "$100.00",
    priceLabel = generateLabels("per_hour"),
    rating = "3.8",
    totalBooking = "5 Booking"
}) => {
    return (
        <Link to={`/studio-details/${id}`} className="studio-item">
            <div className="media-block">
                <img src={pic} alt={title} />
            </div>
            <div className="content-block">
                <h3 className="title-block">{title}</h3>
                <div className="bottom-block">
                    <div className="price-block">
                        <span className="price">{price}</span>
                        <span className="label">{priceLabel}</span>
                    </div>
                    <div className="right-block">
                        <div className="rating-block">
                            <span className="icon-star-fill icon-block"></span>
                            <span className="rating-text">{rating}</span>
                        </div>
                        <div className="total-booking">{totalBooking}{generateLabels("booking")}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default StudioCard;
