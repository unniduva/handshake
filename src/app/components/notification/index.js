import React, { Component } from "react";
import { List, Avatar } from "antd";
import { connect } from "react-redux";
import { getCookie } from "../../helpers/utility";
import { normalizeEmail,generateLabels } from "../../helpers";
import { history } from "../../store"
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

class NotificationW extends Component {


    cookie = JSON.parse(JSON.stringify(getCookie()))
    async componentDidMount() {
        await this.props.getWarnings(normalizeEmail(this.cookie.email))
    }
    render() {
        if (this.props.loading) return (<Loader />)
        const data = this.props.warnings
        return (
            <main className="main-inner-wrapper">
                <section className="messages-wrapper">
                    <div className="container">
                        <h1 className="primary-title">{generateLabels("notifications")}</h1>
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => {
                                var str = new String(item.content)
                                str = str && str.substring(0, 100)
                                return (
                                    <List.Item>
                                        <List.Item.Meta
                                            // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                            title={<span style={{ cursor: "pointer", textTansform: "uppercase" }} onClick={() => history.push("/warningDetail/" + item.id)}>{item.title}</span>}
                                            description={str + " ..."}
                                        />

                                    </List.Item>
                                )
                            }}
                        />
                    </div>
                </section>
            </main>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationW);
