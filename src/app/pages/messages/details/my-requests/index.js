import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Breadcrumb } from "antd";
import Loader from "../../../../components/loader";
import { Link } from "react-router-dom";
import moment from "moment"
import { generateLabels } from "../../../../helpers"

const mapDispatchToProps = ({ studio }) => {
    return {
        ...studio
    };
};

const mapStateToProps = ({ studio }) => {
    return {
        ...studio
    };
};

const messageDetail = {
    id: "5e3b9c7bdec60500045dbe8a01",
    pic: "https://picsum.photos/1400/500?random=4",
    status: "pending",
    title: "Studio 76",
    requestId: "09876",
    listedBy: "Team76",
    location: "Uppsala, Sweden",
    messageInfos: [
        {
            label: "Booking for",
            value: "01 Jan 2020"
        },
        {
            label: "Time Slot",
            value: "1:00 pm - 2:00 pm"
        },
        {
            label: "Price per hour",
            value: "$30.00"
        },
        {
            label: "Total",
            value: "$52.00"
        }
    ],
    includedServices: [
        {
            name: "Session Audio Engineer",
            description: "This studio requires and includes an in-house Engineer in each booking.",
            status: true
        },
        {
            name: "Session Video Engineer",
            description: "This studio requires and includes an in-house Engineer in each booking.",
            status: false
        }
    ],
    details: [
        {
            title: "Max studio occupancy",
            value: "6 people"
        },
        {
            title: "Day rate discount",
            value: "8% off for 8+ hours"
        },
    ],
    cancellationPolicy: {
        title: generateLabels("cancellation_policy"),
        value: "Studiorent Cancellation Policy"
    },
    amenities: "Experienced Engineer Included! Custom lighting system throughout (customize your mood), Ocean breeze Roof deck with lounge ping pong and putput golf, close to Santa Monica Beach and 3rd St. Restaurants, close to metro line, Espresso coffee machine, Coffee/Tea machine, kitchen, mens/womens bathrooms, designated reserved parking.",
    equipment: "Complete 24 fader automated daw control console, Genelec Monitors, Yamaha NS-10 monitors, Highend Universal Audio analog mic preamps, Universal Audio digital converters, Native instruments Maschine Studio drum machine, Komplete 12, N.I. S61 keyboard, Ableton push controller, Apc 40 controller, Neumann U87 legendary vocal mic, Telefunken mics, Akg mics,St69 tube mic stereo pair, Gretsch Electric Guitar, Jackson bass, Vox AC30 Amp (custom tubes), highest quality mogami wiring throughout studio.",
    pastClients: "Warner Bros. Records, MGM, Syco Music, BMG Music, Sony/Atv, MLB-Dodgers, Signature Tracks Music, Ogilvy International Media, Christina Washington.",
    payableCharges: [
        {
            label: "Price per hour",
            value: "$30.00"
        },
        {
            label: "Fri, Jan 31",
            value: "4 hours"
        },
        {
            label: "Engineering Fee",
            value: "$140.00"
        },
        {
            label: "Mixing Fee",
            value: "$450.00"
        },
        {
            label: "Subtotal",
            value: "$710.00"
        },
        {
            label: "Studiotime fee *",
            value: "$71.00"
        },
    ],
    totalBookingPrice: {
        label: "Total booking price",
        value: "$781.00"
    }
}



class messageRequestDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false, reload: false
        };
    }
    tConvert = time => {
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        if (time.length > 1) {
            time = time.slice(1);
            time[5] = +time[0] < 12 ? " AM" : " PM";
            time[0] = +time[0] % 12 || 12;
        }
        console.log(time)
        return time.join("");
    }
    async componentDidMount() {
        console.log("Got herereAT DID MOUNT", this.props.match.params.id)
        await this.props.GetStudioDetailBooking({ docId: this.props.match.params.id })
    }
    getTimeDiff = (start, end) => {
        var startTimeArr = start.split(":")
        var endTimeArr = end.split(":")
        var hrDiff = parseInt(endTimeArr[0]) - parseInt(startTimeArr[0])
        var minutDiff = parseInt(endTimeArr[1]) - parseInt(startTimeArr[1])
        if (minutDiff < 0) {
            hrDiff = hrDiff - 1
            minutDiff = 60 + minutDiff
        }
        else if (minutDiff > 0) {
            minutDiff = 0 + minutDiff
        }
        else {
            minutDiff = 0
        }
        if (minutDiff > 0) return `${hrDiff} hours ${minutDiff} minutes`
        else return `${hrDiff} hours `
    }
    ChangeStatus = async obj => {
        await this.props.updateBooking(obj)
        await this.props.GetStudioDetailBooking({ docId: this.props.match.params.id })
    }
    cancelRequest = async data => {
        var id = data.id
        await this.ChangeStatus(data)

        await this.props.processRefund({ bookingId: id })
    }
    render() {
        const { loading, studioDetails } = this.props;
        if (loading) return <Loader />;

        console.log(this.props)

        return (
            <main className="main-inner-wrapper">
                <section className="my-request-details">
                    <div className="container">
                        <Breadcrumb separator=">">
                            <Breadcrumb.Item>
                                <Link to="/messages">{generateLabels("messages_label")}</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>ID {this.props.match.params.id}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="details-wrap">
                            <div className="media-block">
                                <img src={studioDetails.studioDetails && studioDetails.studioDetails.images && studioDetails.studioDetails.images[0]} alt={messageDetail.title} />
                                {studioDetails.status === "cancelled" && (<span className="uppercase status-block status-cancelled">{generateLabels("canceled")}</span>)}
                                {studioDetails.status === "pending" && (<span className="uppercase status-block status-pending">{generateLabels("pending")}</span>)}
                                {studioDetails.status === "confirmed" && (<span className="uppercase status-block status-confirmed">{generateLabels("confirmed")}</span>)}
                            </div>
                            <div className="content-block">
                                <header className="detail-header">
                                    <div className="id-block">#{studioDetails.id}</div>
                                    <Row type="flex" justify="center" align="middle" gutter={30}>
                                        <Col xs={24} sm={14}>
                                            <h1 className="title-block">{studioDetails.studioDetails && studioDetails.studioDetails.name}</h1>
                                            <div className="studio-sub-info">
                                                {/* <div className="sub-info-item">Studio Listed By: {messageDetail.listedBy}</div> */}
                                                <div className="sub-info-item">
                                                    <span className="icon-location icon-block"></span>
                                                    {studioDetails.studioDetails && studioDetails.studioDetails.formatted_address &&
                                                        studioDetails.studioDetails.formatted_address.place}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={10}>
                                            {studioDetails.status === "pending" && (<div className="btn-wrap">
                                                <Button type="primary" onClick={() => this.cancelRequest({ id: studioDetails && studioDetails.id, status: "cancelled" })}
                                                    className="uppercase cancel-btn">{generateLabels("cancel_request")}</Button></div>)}
                                        </Col>
                                    </Row>
                                </header>
                                <div className="info-block">
                                    <Row type="flex" justify="center" align="middle" gutter={20} style={{ width: "100%" }}>
                                        <Col xs={24} sm={12} lg={6}>
                                            {studioDetails && <div className="info-item" >
                                                <div className="uppercase label-block">{generateLabels("booking_for")}</div>
                                                <div className="value-block">{moment(studioDetails.startDate && studioDetails.startDate.toDate()).format("DD MMM YYYY")}</div>
                                            </div>}
                                        </Col>
                                        <Col xs={24} sm={12} lg={6}>
                                            {studioDetails.startTime && studioDetails.endTime && <div className="info-item" >
                                                <div className="uppercase label-block">{generateLabels("time_slot")}</div>
                                                <div className="value-block">{`${this.tConvert(studioDetails.startTime)} to ${this.tConvert(studioDetails.endTime)}`}</div>
                                            </div>}
                                        </Col>
                                        <Col xs={24} sm={12} lg={6}>
                                            <div className="info-item" >
                                                <div className="uppercase label-block">{generateLabels("price_per_hr")}</div>
                                                <div className="value-block">{`$ ${studioDetails.studioDetails &&
                                                    parseFloat(studioDetails.studioDetails.Hourlyrate).toFixed(2)}`}</div>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} lg={6}>
                                            <div className="info-item" >
                                                <div className="uppercase label-block">{"Total"}</div>
                                                <div className="value-block">{`$ ${studioDetails && parseFloat(studioDetails.price).toFixed(2)}`}</div>
                                            </div>
                                        </Col>
                                        {/* {messageDetail.messageInfos.map((info, key) => (
                                            <Col xs={24} sm={12} lg={6}>
                                                <div className="info-item" key={key}>
                                                    <div className="uppercase label-block">{info.label}</div>
                                                    <div className="value-block">{info.value}</div>
                                                </div>
                                            </Col>
                                        ))} */}
                                    </Row>
                                </div>
                                <div className="has-padding">
                                    <h3 className="block-title">{generateLabels("included_and_additional_services")}</h3>
                                    <div className="service-block">
                                        {studioDetails.studioDetails &&
                                            <div className="service-item" >
                                                <h3 className="title-block">{generateLabels("session_audio_eng")}</h3>
                                                <p className="description-block">{generateLabels("sess_aud_eng_desc")}</p>
                                                {studioDetails.studioDetails.audioEngineer === true ?
                                                    <div className="service-status active">
                                                        <span className="icon-tick-round icon-block"></span>
                                                        <span className="text-block">{generateLabels("included")}</span>
                                                    </div>
                                                    :
                                                    <div className="service-status not-active">
                                                        <span className="icon-close-round icon-block"></span>
                                                        <span className="text-block">{generateLabels("not_included")}</span>
                                                    </div>
                                                }
                                            </div>}
                                    </div>
                                    <h3 className="block-title">{generateLabels("details")}</h3>

                                    {studioDetails && studioDetails.studioDetails && <div className="details-list-wrap">
                                        <div className="list-item" >
                                            <div className="label-block">{generateLabels("max_studio_occupancy")}</div>
                                            <div className="data-block">{`${studioDetails.studioDetails.maxStudioOccupancy} people`}</div>
                                        </div>
                                        {studioDetails.studioDetails.discAudEng === true && <div className="list-item" >
                                            <div className="label-block">{generateLabels("day_rate_discount")}</div>
                                            <div className="data-block">{`${studioDetails.studioDetails.discount} % off for 8+ hours`}</div>
                                        </div>}
                                        <div className="list-item">
                                            <div className="label-block">{messageDetail.cancellationPolicy.title}</div>
                                            <div className="data-block">
                                                <Link to="/">{messageDetail.cancellationPolicy.value}</Link></div>
                                        </div>
                                    </div>}
                                    <h3 className="block-title">{generateLabels("amenities")}</h3>
                                    <div className="text-wrap">
                                        <p className="para-block">{studioDetails.studioDetails && studioDetails.studioDetails.amenities}</p>
                                    </div>
                                    <h3 className="block-title">{generateLabels("main_equipment")}</h3>
                                    <div className="text-wrap">
                                        <p className="para-block">{studioDetails.studioDetails && studioDetails.studioDetails.mainEquipment}</p>
                                    </div>
                                    <Row gutter={30}>
                                        <Col xs={24} sm={12}>
                                            {/* <h3 className="block-title">Location</h3>
                                            <div className="location-map-block">

                                            </div> */}
                                        </Col>
                                        <Col xs={24} sm={12}>
                                            <h3 className="block-title">{generateLabels("payable_charges")}</h3>
                                            <ul className="charges-list">
                                                <li className="list-item" >
                                                    <div className="label-block">{generateLabels("price_per_hr")}</div>
                                                    <div className="value-block">{`$ ${studioDetails.studioDetails &&
                                                        parseFloat(studioDetails.studioDetails.Hourlyrate).toFixed(2)}`}</div>
                                                </li>
                                                {studioDetails.startTime && studioDetails.endTime && <li className="list-item" >
                                                    <div className="label-block">{moment(studioDetails.startDate && studioDetails.startDate.toDate()).format("ll")}</div>
                                                    <div className="value-block">{this.getTimeDiff(studioDetails.startTime, studioDetails.endTime)}</div>
                                                </li>}
                                                {studioDetails.sessionAudEng && studioDetails.sessionAudEng === true && <li className="list-item" >
                                                    <div className="label-block">{generateLabels("session_audio_eng")}</div>
                                                    <div className="value-block">{`$ ${studioDetails.sessionAudEngRate}`}</div>
                                                </li>}
                                                {studioDetails.mixingServices === true && <li className="list-item" >
                                                    <div className="label-block">{generateLabels("mixing_services_label")}</div>
                                                    <div className="value-block">{`$ ${parseFloat(studioDetails.mixingServicesRate).toFixed(2)}`}</div>
                                                </li>}
                                                {studioDetails.otherServices === true && <li className="list-item" >
                                                    <div className="label-block">{generateLabels("other_services")}</div>
                                                    <div className="value-block">{`$ ${parseFloat(studioDetails.otherServicesRate).toFixed(2)}`}</div>
                                                </li>}
                                                {studioDetails && studioDetails.serviceCharge && <li className="list-item" >
                                                    <div className="label-block">{generateLabels("service_charge")}</div>
                                                    <div className="value-block">{`$ ${parseFloat(studioDetails.serviceCharge).toFixed(2)}`}</div>
                                                </li>}
                                                {studioDetails.priceMetatdata && studioDetails.priceMetatdata.Discount && <li className="list-item" >
                                                    <div className="label-block">{generateLabels("discount")}</div>
                                                    <div className="value-block">{`$ ${studioDetails.priceMetatdata && studioDetails.priceMetatdata.Discount &&
                                                        parseFloat(studioDetails.priceMetatdata.Discount).toFixed(2)}`}</div>
                                                </li>}
                                                <li className="list-item" >
                                                    <div className="label-block">{"Sub Total"}</div>
                                                    <div className="value-block">{`$ ${studioDetails.priceMetatdata && studioDetails.priceMetatdata.Sub_Total &&
                                                        parseFloat(studioDetails.priceMetatdata.Sub_Total).toFixed(2)}`}</div>
                                                </li>
                                                {/* {messageDetail.payableCharges.map((item, key) => (
                                                    <li className="list-item" key={key}>
                                                        <div className="label-block">{item.label}</div>
                                                        <div className="value-block">{item.value}</div>
                                                    </li>
                                                ))} */}
                                            </ul>
                                            <div className="total-booking-price">
                                                <div className="label-block">{generateLabels("total_booking_price")}</div>
                                                <div className="value-block">{`$ ${studioDetails.price &&
                                                    parseFloat(studioDetails.price).toFixed(2)}`}</div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(messageRequestDetails);
