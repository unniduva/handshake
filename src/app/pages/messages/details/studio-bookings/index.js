import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Breadcrumb } from "antd";
import Loader from "../../../../components/loader";
import { Link } from "react-router-dom";
import moment from "moment"
import {generateLabels} from "../../../../helpers"
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

class messageStudioBookingsDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
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
                <section className="studio-booking-details">
                    <div className="container">
                        <Breadcrumb separator=">">
                            <Breadcrumb.Item>
                                <Link to="/messages">{generateLabels("messages_label")}</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>ID {this.props.match.params.id}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="details-wrap">
                            <header className="detail-header">
                                <div className="sub-title-wrap">
                                    <div className="id-block">#{studioDetails.id}</div>
                                    {studioDetails.status === "cancelled" && (<span className="uppercase status-block status-cancelled">{generateLabels("canceled")}</span>)}
                                    {studioDetails.status === "pending" && (<span className="uppercase status-block status-pending">{generateLabels("pending")}</span>)}
                                    {studioDetails.status === "confirmed" && (<span className="uppercase status-block status-confirmed">{generateLabels("confirmed")}</span>)}
                                </div>
                                <Row type="flex" justify="center" align="middle" gutter={30}>
                                    <Col xs={24} sm={14}>
                                        <h1 className="title-block">{studioDetails.studioDetails && studioDetails.studioDetails.name}</h1>
                                    </Col>
                                    <Col xs={24} sm={10}>
                                        <div className="btn-wrap">
                                            <Button type="primary" disabled={studioDetails.status === "pending" ? false : true}
                                                onClick={() => this.ChangeStatus({ id: studioDetails && studioDetails.id, status: "confirmed" })}
                                                className="btn-width-auto uppercase accept-btn">{generateLabels("accept")}</Button>
                                            <Button type="default" disabled={studioDetails.status === "pending" ? false : true}
                                                onClick={() => this.cancelRequest({ id: studioDetails && studioDetails.id, status: "cancelled" })}
                                                className="btn-width-auto uppercase reject-btn">{generateLabels("reject")}</Button>
                                        </div>
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
                                    {/* {studioDetail.messageInfos.map((info, key) => (
                                        <Col xs={24} md={8}>
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
                                        <div className="value-block">{`$ ${parseFloat(studioDetails.sessionAudEngRate).toFixed(2)}`}</div>
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
                                    {studioDetails.priceMetatdata && studioDetails.priceMetatdata.Discount > 0 && <li className="list-item" >
                                        <div className="label-block">{generateLabels("discount")}</div>
                                        <div className="value-block">{`$ ${studioDetails.priceMetatdata && studioDetails.priceMetatdata.Discount &&
                                            parseFloat(studioDetails.priceMetatdata.Discount).toFixed(2)}`}</div>
                                    </li>}
                                    <li className="list-item" >
                                        <div className="label-block">{"Sub Total"}</div>
                                        <div className="value-block">{`$ ${studioDetails.priceMetatdata && studioDetails.priceMetatdata.Sub_Total &&
                                            parseFloat(studioDetails.priceMetatdata.Sub_Total||0).toFixed(2)}`}</div>
                                    </li>
                                </ul>
                                <div className="total-booking-price">
                                    <div className="label-block">{generateLabels("total_booking_price")}</div>
                                    <div className="value-block">{`$ ${studioDetails.price &&
                                        parseFloat(studioDetails.price).toFixed(2)}`}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(messageStudioBookingsDetails);
