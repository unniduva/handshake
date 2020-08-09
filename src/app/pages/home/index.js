import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Row, Col } from "antd";
import Loader from "../../components/loader";
import StudioCard from "../../components/studio-card"
import LocationCard from "../../components/location-card"
import StudioTypeCard from "../../components/StudioTypeCard"
import { generateLabels, getCurrentPosition } from "../../helpers"
import { history } from "../../store";
import { Link } from "react-router-dom";

// slick slider styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const exploreStudios = [
    {
        pic: "/images/stockholm.jpg",
        title: "Stockholm",
        location: { lat: 59.32932349999999, lng: 18.0685808 }
    },
    {
        pic: "/images/gothenburg.jpg",
        title: generateLabels("gothenburg"),
        location: { lat: 57.70887, lng: 11.974559999999997 }
    },
    {
        pic: "/images/malmoe.jpg",
        title: "Malmö",
        location: { lat: 55.6058693, lng: 13.0007296 }
    }
]

const chooseStudios = [
    {
        pic: {
            webp: "/images/choose-studios/professional.webp",
            png: "/images/choose-studios/professional.png"
        },
        title: "professional",
        url: "proffessional",
    },
    {
        pic: {
            webp: "/images/choose-studios/midlevel.webp",
            png: "/images/choose-studios/midlevel.png"
        },
        title: "Mid Level",
        url: "midlevel"
    },
    {
        pic: {
            webp: "/images/choose-studios/basic.webp",
            png: "/images/choose-studios/basic.png"
        },
        title: "Basic",
        url: "basic"
    }
]

class Home extends Component {
    async componentDidMount() {
        console.log(this.props)
        // await this.props.listStudios()
        var pos = await getCurrentPosition()

        console.log(this.props)
    }

    render() {
        const { loading, } = this.props;
        if (loading) return <Loader />;
        return (
            <main className="main-inner-wrapper">
                <section className="main-banner">
                    <picture className="media-block">
                        {/* <source type="image/webp" media="(min-width: 768px)" srcset="images/home-banner.webp" />
                        <source type="image/png" media="(min-width: 768px)" srcset="images/home-banner.jpg" />

                        <source type="image/webp" media="(max-width: 767px)" srcset="images/home-banner-xs.webp" />
                        <source type="image/png" media="(max-width: 767px)" srcset="images/home-banner-xs.png" /> */}

                        <img src="images/banner.jpeg" alt="" />
                    </picture>
                    <div className="content-block">
                        <div className="container">
                            <h1 className="title-block">{generateLabels("where_words_leave_off")}<span>{generateLabels("music_begins")}</span></h1>
                            <Button className="btn-has-icon btn-block" type="default" onClick={this.click}>
                                <span className="text-block uppercase">{generateLabels("get_started")}</span>
                                <span className="icon-long-arrow-right icon-block"></span>
                            </Button>
                        </div>
                    </div>
                </section>
                {/* "https://picsum.photos/366/200?random=1" */}
                <section className="explore-studios-wrapper">
                    <div className="container">
                        <h2 className="primary-title">{`${generateLabels("")|| 'How we works'} `}</h2>
                        <div className="studios-by-location has-slider">
                            <Col sm={24} md={12} lg={12} style={{ padding: '12px' }}>
                                <Link to={"/"} className="studio-item">
                                    <img className="media-block" src={"images/banner3.png"} alt={""} />
                                    <div className="content-block">
                                        <h3 className="title-block uppercase">{generateLabels("") || "For Charities"}</h3>
                                    </div>
                                </Link>
                            </Col>
                            <Col sm={24} md={12} lg={12} style={{ padding: '12px' }}>
                                <Link to={"/"} className="studio-item">
                                    <img className="media-block" src={"images/banner1.jpg"}  alt={""} />
                                    <div className="content-block">
                                        <h3 className="title-block uppercase">{generateLabels("") || "For Users"}</h3>
                                    </div>
                                </Link>
                            </Col>
                        </div>   </div>
                </section>
                {/* <section className="nearby-studios-wrapper">
                    <div className="container">
                        <h2 className="primary-title">{generateLabels("studios_near_label")}</h2>
                        <div className="studios-nearby">
                            <Row type="flex" gutter={24}>
                                {this.props.studios && this.props.studios.length > 0 ? this.props.studios.map((item, key) => (
                                    <Col sm={24} md={12} lg={8} key={key}>
                                        <StudioCard
                                            id={item.id}
                                            pic={item.data.images && item.data.images[0]}
                                            title={item.data.name}
                                            price={`$ ${parseFloat(item.data.Hourlyrate).toFixed(2)}`}
                                            priceLabel={"per hour"}
                                            rating={item.data.rating || 0}
                                            totalBooking={item.data.bookings} />
                                    </Col>
                                )) : <span style={{ marginBottom: "12px", marginLeft: "12px" }}>{generateLabels("no_studios_found")}</span>}
                            </Row>
                        </div>
                        <span style={{ cursor: "pointer" }} onClick={() =>
                            history.push("/search-result", { limit: 20 })
                        } className="view-more-btn">
                            {generateLabels("more_studio")}
                        </span>

                    </div>
                </section> */}
                {/* <section className="explore-studios-wrapper">
                    <div className="container">
                        <div className="studios-by-location has-slider">
                            {[1,2,3].map((studio, key) => (
                                <div className="slider-item" key={key}>
                                    <StudioTypeCard  title={""} url={""} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section> */}
                {/* <section className="how-works-wrapper">
                    <div className="container">
                        <div className="card-block">
                            <picture className="media-block">
                                <source srcSet="images/how-work-bg.webp" type="image/webp" />
                                <img src="images/how-work-bg.png" alt="" />
                            </picture>
                            <div className="content-block">
                                <Row type="flex" gutter={40} justify="space-between" align="bottom">
                                    <Col sm={24} lg={10}>
                                        <h2 className="title-block">{generateLabels("how_we_works")}</h2>
                                        <p className="para-block">{generateLabels("footer_text_1")}</p>
                                        <Button className="btn-has-icon btn-block" type="default" onClick={() => history.push("/add-studio")}>
                                            <span className="text-block uppercase">{generateLabels("get_started")}</span>
                                            <span className="icon-long-arrow-right icon-block"></span>
                                        </Button>
                                    </Col>
                                    <Col sm={24} lg={14}>
                                        <div className="how-work-item">
                                            <span className="icon-zoom-lens icon-block"></span>
                                            <div className="right-block">
                                                <h3 className="item-title">{generateLabels("discover_studios")}</h3>
                                                <p className="item-para">{generateLabels("footer_text_2")}</p>
                                            </div>
                                        </div>
                                        <div className="how-work-item">
                                            <span className="icon-paper-plane icon-block"></span>
                                            <div className="right-block">
                                                <h3 className="item-title">{generateLabels("request")}</h3>
                                                <p className="item-para">{generateLabels("footer_text_3")}</p>
                                            </div>
                                        </div>
                                        <div className="how-work-item">
                                            <span className="icon-mic icon-block"></span>
                                            <div className="right-block">
                                                <h3 className="item-title">{generateLabels("book_and_pay")}</h3>
                                                <p className="item-para">{generateLabels("footer_text_4")}</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </section> */}
            </main>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
