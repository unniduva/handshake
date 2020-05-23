import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Row, Col, Carousel } from "antd";
import Loader from "../../components/loader";
import { Link } from "react-router-dom";
// import StudioCard from "../../components/studio-card"
// import LocationCard from "../../components/location-card"
import StudioTypeCard from "../../components/StudioTypeCard"
import { generateLabels } from "../../helpers"
import { history } from "../../store";
import Slider from "react-slick";

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

function NextArrow(props) {
    const { onClick } = props;
    return (
        <div
            className="slick-arrow icon-arrow-right next-btn"
            onClick={onClick}
        />
    );
}

function PrevArrow(props) {
    const { onClick } = props;
    return (
        <div
            className="slick-arrow icon-arrow-left prev-btn"
            onClick={onClick}
        />
    );
}

const bannerimages = ["https://firebasestorage.googleapis.com/v0/b/handshake-362ff.appspot.com/o/children-sitting-on-ground-2409929%20(1).jpg?alt=media&token=d648f70e-ab53-458c-afb1-15cdf9e1a061","https://firebasestorage.googleapis.com/v0/b/handshake-362ff.appspot.com/o/hands-kids-750x425.png?alt=media&token=098ff00b-a061-4aad-bfff-778cf247e739", "https://firebasestorage.googleapis.com/v0/b/handshake-362ff.appspot.com/o/CTY-kindness03-4.jpeg?alt=media&token=3c1e3c27-c059-4ba0-a6f1-254bbb8ed987"]

const studioSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
};

class Home extends Component {
    async componentDidMount() {
    }

    render() {
        const { loading, } = this.props;
        if (loading) return <Loader />;
        const exploreSlider = {
            dots: true,
            arrows: false,
            infinite: true,
            speed: 500,
            slidesToScroll: 1,
            slidesToShow: 3,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <main className="main-inner-wrapper">
                <section className="main-banner">
                    <div className="studio-banner-slider" >
                        <Slider  {...studioSliderSettings}>
                            {bannerimages.map((pic, key) => (
                                <div className="slider-item" key={key}>
                                    <img src={pic} alt={"Online Charity Donation"} />
                                </div>
                            ))}
                        </Slider>
                        <div id="carousal" style={{marginTop:'-70px', marginLeft:'35%'}}>
                            <Carousel autoplay dots={false}>
                                <div>
                                    <h3 style={{color:"white",fontWeight: '600',fontSize: '20px'}}>This is mock test going to be live within 5 months</h3>
                                </div>
                                <div>
                                    <h3 style={{color:"white",fontWeight: '600',fontSize: '20px'}}>{"Handshake for charities"}</h3>
                                </div>
                                <div>
                                    <h3 style={{color:"white",fontWeight: '600',fontSize: '20px'}}>Love and kindness are never wasted</h3>
                                </div>
                              
                            </Carousel>
                        </div>
                    </div>
                    <div className="content-block">
                        <div className="container">
                            {/* <h1 className="title-block">{generateLabels("where_words_leave_off")}<span>{generateLabels("music_begins")}</span></h1>
                            <Button className="btn-has-icon btn-block" type="default" onClick={() => history.push("/add-studio")}>
                                <span className="text-block uppercase">{generateLabels("get_started")}</span>
                                <span className="icon-long-arrow-right icon-block"></span>
                            </Button> */}
                        </div>
                    </div>
                </section>
                <section className="explore-studios-wrapper">
                    <div className="container">
                        <h2 className="primary-title">{`${generateLabels("explore_studios_label")||"How it Works"}`}</h2>
                        <div className="studios-by-location has-slider">
                            <Col sm={24} md={12} lg={12} style={{ padding: '12px' }}>
                                <Link to={"/"} className="studio-item">
                                    <img className="media-block" src={"https://picsum.photos/365/200?random=1"} alt={""} />
                                    <div className="content-block">
                                        <h3 className="title-block uppercase">{generateLabels("") || "For Charities"}</h3>
                                    </div>
                                </Link>
                            </Col>
                            <Col sm={24} md={12} lg={12} style={{ padding: '12px' }}>
                                <Link to={"/"} className="studio-item">
                                    <img className="media-block" src={"https://picsum.photos/366/200?random=1"} alt={""} />
                                    <div className="content-block">
                                        <h3 className="title-block uppercase">{generateLabels("") || "For Users"}</h3>
                                    </div>
                                </Link>
                            </Col>
                        </div>
                        {/* <span style={{ cursor: "pointer" }} onClick={() =>
                            history.push("/search-result", { limit: 20 })
                        } className="view-more-btn">
                            {generateLabels("more_studio")}
                        </span> */}
                        {/* <Link to="/search-result" className="view-more-btn">{generateLabels("more_studio")}</Link> */}
                    </div>
                </section>
                <section className="nearby-studios-wrapper">
                    <div className="container">
                        {/* <h2 className="primary-title">{generateLabels("studios_near_label")}</h2> */}
                        <div className="studios-nearby">
                            {/* <Row type="flex" gutter={24}>
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
                            </Row> */}
                        </div>
                        {/* <span style={{ cursor: "pointer" }} onClick={() =>
                            history.push("/search-result", { limit: 20 })
                        } className="view-more-btn">
                            {generateLabels("more_studio")}
                        </span> */}
                        {/* <Link to="/search-result"
                            state={{
                                limit: 10
                            }} className="view-more-btn">{generateLabels("more_studio")}</Link> */}
                    </div>
                </section>
                <section className="explore-studios-wrapper">
                    <div className="container">
                        {/* <h2 className="primary-title">{generateLabels("choose_your_studio")}</h2> */}
                        <div className="studios-by-location has-slider">
                            {/* <Slider {...exploreSlider}>
                                {chooseStudios.map((studio, key) => (
                                    <div className="slider-item" key={key}>
                                        <StudioTypeCard pic={studio.pic} title={studio.title} url={studio.url} />
                                    </div>
                                ))}
                            </Slider> */}
                        </div>
                    </div>
                </section>
                <section className="how-works-wrapper">
                    <div className="container">
                        {/* <div className="card-block" style={{ backgroundImage: "url(images/how-work-bg.webp), url(images/how-work-bg.png)" }}> */}
                        {/* <Row type="flex" gutter={40} justify="space-between" align="bottom">
                                <Col sm={24} lg={10}>
                                    <h2 className="title-block">{generateLabels("how_we_works")}</h2>
                                    <p className="para-block">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
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
                                            <p className="item-para">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</p>
                                        </div>
                                    </div>
                                    <div className="how-work-item">
                                        <span className="icon-paper-plane icon-block"></span>
                                        <div className="right-block">
                                            <h3 className="item-title">{generateLabels("request")}</h3>
                                            <p className="item-para">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</p>
                                        </div>
                                    </div>
                                    <div className="how-work-item">
                                        <span className="icon-mic icon-block"></span>
                                        <div className="right-block">
                                            <h3 className="item-title">{generateLabels("book_and_pay")}</h3>
                                            <p className="item-para">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</p>
                                        </div>
                                    </div>
                                </Col>
                            </Row> */}
                        {/* </div> */}
                    </div>
                </section>
            </main>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
