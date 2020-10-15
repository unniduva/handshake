import React, { Component } from "react";
import moment from "moment";
import { Row, Col } from "antd";
import { Link, Redirect } from "react-router-dom";
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
                            <ul className="menu-list">
                                {/* <li>
                                    <Link to="/">{generateLabels("home")}</Link>
                                </li> */}
                                <li>
                                    <Link to="/about">{generateLabels("about")}</Link>
                                </li>
                                <li>
                                    <Link to="/contact">{generateLabels("contact")}</Link>
                                </li>
                                <li>
                                    <Link to="/privacy">{generateLabels("privacy")}</Link>
                                </li>
                                <li>
                                    <Link to="/terms">{generateLabels("terms")}</Link>
                                </li>
                            </ul>
                        </Col>
                        <Col xs={12} sm={12} md={5} lg={4}>
                            <h3 className="title-block uppercase">{generateLabels("learn_more")}</h3>
                            <ul className="menu-list">
                                <li>
                                    <Link to="/howitworks">{generateLabels("how_it_works")}</Link>
                                </li>
                                {/* <li>
                                    <Link to="/studiofees">{generateLabels("studio_fees")}</Link>
                                </li> */}
                                <li>
                                    <Link to="/trustandsafety">{generateLabels("trust_and_safety")}</Link>
                                </li>
                                <li>
                                    <Link to="/faq">{`FAQ- ${generateLabels("help")}`}</Link>
                                </li>
                                {/* <li>
                                    <Link to="/help">{generateLabels("help")}</Link>
                                </li> */}
                            </ul>
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
                        <Col xs={24} sm={24} lg={4}>
                            <h3 className="title-block uppercase">Social</h3>
                            <Social />
                        </Col>
                    </Row>
                    <div className="copy-right-block">
                        <a target="_blank" href="https://vaut-enterprises.web.app/">   &copy; VAUT Technologies {moment().format("YYYY")}</a>
                    </div>
                </div>
            </footer>
        );
    }
}
