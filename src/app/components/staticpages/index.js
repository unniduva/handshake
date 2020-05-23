import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "../loader"
import { getLanguage } from "../../helpers/utility"
const mapDispatchToProps = ({ cms, studio }) => {
    return {
        ...cms, ...studio
    };
};

const mapStateToProps = ({ cms, studio }) => {
    return {
        ...cms, ...studio
    };
};

class Cms extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false }
    }
    async componentWillReceiveProps(newProp) {
        if (this.props.language !== newProp.language) {
            await this.setState({ loading: true })
            if (this.props.match.params.type)
                await this.props.getCMS({ type: this.props.match.params.type, language: getLanguage() || "eng" })
            await this.setState({ loading: false })
        }
    }
    async componentDidMount() {
        await this.setState({ loading: true })
        if (this.props.match.params.type)
            await this.props.getCMS({ type: this.props.match.params.type, language: getLanguage() || "eng" })
        await this.setState({ loading: false })
    }
    render() {
        var { cms } = this.props
        if (this.state.loading) return (<Loader />)
        return (
            <main className="main-inner-wrapper">
                <section className="messages-wrapper">
                    <div className="container">
                        {/* <h1 className="primary-title">Help</h1>
                        <p className="item-para">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</p> */}
                        <div dangerouslySetInnerHTML={{ __html: cms && cms.contents }} ></div>

                    </div>
                </section>
            </main>

        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cms)
