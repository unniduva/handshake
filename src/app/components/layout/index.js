import React, { Component } from "react";
import { connect } from "react-redux";
import TopBar from "../top-bar";
import Footer from "../footer";
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

class Layout extends Component {
    constructor(props) {
        super(props)
        this.state = { refresh: false }
    }
    refreshComp = async () => {
        await this.setState({ refresh: !this.state.refresh })
    }
    async componentDidMount() {
        await this.props.getLanguages(this.props.language)
    }
    render() {
        const { children, settings } = this.props;
        return (
            <React.Fragment>

                {settings.topbar ? <TopBar refreshComp={this.refreshComp} page={settings.title} hideSearch={settings.hideSearch} /> : null}
                <div className="app-body">
                    {children}
                </div>
                {settings.footer !== false && <Footer refreshComp={this.refreshComp} />}
            </React.Fragment>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Layout);

