import React, { Component } from "react";
import moment from "moment";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import Social from "../social";
import { generateLabels } from "../../helpers";
export default class Footer extends Component {

    render() {
        return (
            <footer className="main-footer">
                <div className="container">
                    <Row type="flex" gutter={24}>
                        <Col xs={12} sm={12} md={5} lg={4}>
                            <h3 className="title-block uppercase">{generateLabels("company")}</h3>
                            {/* <ul className="menu-list">
                                <li>
                                    <Link to="/">{generateLabels("home")}</Link>
                                </li>
                                <li>
                                    <Link to="/cms/about">{generateLabels("about")}</Link>
                                </li>
                                <li>
                                    <Link to="/cms/contact">{generateLabels("contact")}</Link>
                                </li>
                                <li>
                                    <Link to="/cms/privacy">{generateLabels("privacy")}</Link>
                                </li>
                                <li>
                                    <Link to="/cms/terms">{generateLabels("terms")}</Link>
                                </li>
                            </ul> */}
                        </Col>
                        <Col xs={12} sm={12} md={5} lg={4}>
                            <h3 className="title-block uppercase">{generateLabels("learn_more")}</h3>
                            {/* <ul className="menu-list">
                                <li>
                                    <Link to="/cms/howitworks">{generateLabels("how_it_works")}</Link>
                                </li>
                                <li>
                                    <Link to="/cms/studiofees">{generateLabels("studio_fees")}</Link>
                                </li>
                                <li>
                                    <Link to="/cms/trustandsafety">{generateLabels("trust_and_safety")}</Link>
                                </li>
                                <li>
                                    <Link to="/cms/faq">FAQ</Link>
                                </li>
                                <li>
                                    <Link to="/cms/help">{generateLabels("help")}</Link>
                                </li>
                            </ul> */}
                        </Col>
                        {/* <Col xs={24} sm={12} md={14} lg={12}>
                            <h3 className="title-block uppercase">{generateLabels("top_cities")}</h3>
                            <Row>
                                <Col span={8}>
                                    <ul className="menu-list">
                                        <li>
                                            <Link to="/">Stockholm</Link>
                                        </li>
                                        <li>
                                            <Link to="/">Gothenburg</Link>
                                        </li>
                                        <li>
                                            <Link to="/">Malmo</Link>
                                        </li>
                                        <li>
                                            <Link to="/">Uppsala</Link>
                                        </li>
                                        <li>
                                            <Link to="/">Visby</Link>
                                        </li>
                                    </ul>
                                </Col>
                                <Col span={8}>
                                    <ul className="menu-list">
                                        <li>
                                            <Link to="/">Helsingborg</Link>
                                        </li>
                                        <li>
                                            <Link to="/">Lund</Link>
                                        </li>
                                        <li>
                                            <Link to="/">Umeå</Link>
                                        </li>
                                        <li>
                                            <Link to="/">Vasteras</Link>
                                        </li>
                                        <li>
                                            <Link to="/">Linkoping</Link>
                                        </li>
                                    </ul>
                                </Col>
                                <Col span={8}>
                                    <ul className="menu-list">
                                        <li>
                                            <Link to="/">Gavle</Link>
                                        </li>
                                        <li>
                                            <Link to="/">Orebro</Link>
                                        </li>
                                        <li>
                                            <Link to="/">Karlskrona</Link>
                                        </li>
                                        <li>
                                            <Link to="/">Ystad</Link>
                                        </li>
                                        <li>
                                            <Link to="/">Norrkoping</Link>
                                        </li>
                                    </ul>
                                </Col>
                            </Row>
                        </Col> */}

                    </Row>
                    <Col>
                        <h3 className="title-block uppercase">Social</h3>
                        <Social />
                    </Col>
                    <div className="copy-right-block">&copy; VAUT {moment().format("YYYY")}</div>
                    <small className="copy-right-block">All Rights Reserved under VAUT Technologies</small>
                </div>
            </footer>
        );
    }
}
