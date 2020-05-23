import React, { Component } from "react";
import { connect } from "react-redux";
import { getCookie } from "../../helpers/utility";
import { normalizeEmail } from "../../helpers";
import Loader from "../loader"

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
class WarningDetail extends Component {
    cookie = JSON.parse(JSON.stringify(getCookie()))

    async componentDidMount() {
        if (this.props.match.params.id) await this.props.getWarningDetail({
            docKey: normalizeEmail(this.cookie.email),
            id: this.props.match.params.id
        })
    }
    render() {
        if(this.props.loading) return(<Loader/>)
        return (
            <main className="main-inner-wrapper">
                <section className="messages-wrapper">
                    <div className="container">
                        <h1 className="primary-title">{this.props.warningDetail.title}</h1>
                        <p className="item-para">{this.props.warningDetail.content}</p>
                    </div>
                </section>
            </main>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WarningDetail);
