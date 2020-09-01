import React from "react";
import { Link } from "react-router-dom";
import { Input, Dropdown, Select, Avatar } from "antd";
import { connect } from "react-redux";
import { generateLabels } from "../../helpers";
import { setLanguage, getLanguage } from "../../helpers/utility";
import { history } from "../../store";
const { Option } = Select

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
class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuIsOpen: false,
            searchIsOpen: false,
            searchKeyword: "",
            lang: "eng"
        };
        this.menuHandler = this.menuHandler.bind(this);
        this.menuItemHandler = this.menuItemHandler.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
        this.searchStudios = this.searchStudios.bind(this);
        this.searchOnChange = this.searchOnChange.bind(this);
    }
    async logout(e) {
        e.preventDefault();
        await this.props.logout();
        history.push("/");
    }
    async componentDidMount() {
        await this.setState({ lang: getLanguage() })

    }
    async componentDidUpdate() {
        console.log(this.props.language, this.state.lang)
        if (this.props.language !== this.state.lang) this.props.updateLanguage(this.state.lang)
    }
    menuHandler() {
        this.setState({
            menuIsOpen: !this.state.menuIsOpen
        });
    }
    menuItemHandler() {
        this.setState({
            menuIsOpen: false
        });
    }

    searchHandler() {
        this.setState({
            searchIsOpen: !this.state.searchIsOpen
        });
    }

    searchOnChange(e) {
        // this.setState({
        //     searchKeyword: e.target.value
        // });
        this.props.setPublicSearchPhase({ searchKeyword: e.target.value })
    }

    async searchStudios(e) {
        e.preventDefault();
    }
    handleLangChange = async data => {
        await setLanguage(data)
        await this.setState({ lang: data })
        await this.props.updateLanguage(data)
    }
    handleRedirect = () => {
        this.props.setPublicSearchPhase({ searchKeyword: "" })
        // this.setState({ searchKeyword: "" })
        history.push("/")
    }
    async componentWillReceiveProps(newProp) {
        if (newProp.page === "Home" && this.props.page !== "Home") this.props.searchKeyword !== "" && await this.props.setPublicSearchPhase({ searchKeyword: "" })
    }
    render() {
        const { user } = this.props;
        const myProfileMenu = (
            <div className="header-profile-dropdown">
                <div className="dropdown-header">
                    {user !== null && user.imgUrl ?
                        <span className="dp-block"><img src={user.imgUrl} alt="" /></span>
                        :
                        <Avatar className="dp-block profile-text-avatar">{user && user !== null && user.firstName ? user.firstName.charAt(0).toUpperCase() : "S"}</Avatar>
                    }
                    <div className="user-details">
                        <div className="name-block">{user && user !== null && user.firstName} {user && user.lastName}</div>
                        <div className="email-block">{user && user.email}</div>
                    </div>
                </div>
                <Link to="/my-profile" className="menu-item">{generateLabels("my_profile")}</Link>
                {/* <Link to="/my-studios" className="menu-item">{generateLabels("my_studios")}</Link> */}
                {/* <Link to="/settings" className="menu-item">{generateLabels("settings")}</Link> */}
                <Link to="/notifications" className="menu-item">{generateLabels("notifications")}</Link>
                {/* <Link to="/help" className="menu-item">{generateLabels("help")}</Link> */}
                <Link to="/cms/faq" className="menu-item">{`FAQ-${generateLabels("help")}`}</Link>
                <Link to="/" className="menu-item signout-btn" onClick={this.logout.bind(this)}>
                    {generateLabels("logout")}
                </Link>
            </div>
        )
        // console.log("user =", user);
        return (
            <header className="main-header">
                <div className="left-block">

                    {this.props.page !== "Home" && <button className="btn icon-arrow-left app-back-btn" onClick={() => history.goBack()}></button>}
                    <div style={{ cursor: "pointer", display: "contents" }} onClick={() => this.handleRedirect()} className="logo-block">
                        <img style={{ marginTop: "-9px" }} src="/images/icon.png" alt="" />
                        <h2 style={{ padding: "6px 12px 0px 1px", color: "#932068" }}>HandShake</h2></div>
                    <form className={`search-box${this.state.searchIsOpen ? " open" : ""}`} onSubmit={this.searchStudios}>
                        <span className="icon-search icon-block"></span>
                        <Input className="input-block" placeholder={`${generateLabels("wrd_try")} “name of charity”`} value={this.props.searchKeyword} onChange={this.searchOnChange} />
                    </form>
                </div>
                <div>

                </div>
                <div className="right-block">
                    {/* <Select value={this.state.lang} onChange={data => this.handleLangChange(data)} className="language-select" dropdownClassName="language-dropdown">
                        <Option value="eng">
                            <span className="full-name">English</span>
                            <span className="short-name">Eng</span>
                        </Option>
                        <Option value="swd">
                            <span className="full-name">Swedish</span>
                            <span className="short-name">Swd</span>
                        </Option>
                    </Select> */}
                    <button className="btn icon-search toggle-search-btn" type="button" onClick={this.searchHandler}></button>
                    <button className="btn icon-menu toggle-menu-btn" type="button" onClick={this.menuHandler}></button>
                    {user && user.email ?
                        <>
                            <nav className={`main-nav${this.state.menuIsOpen ? " open" : ""}`}>
                                <Link to="/home" onClick={this.menuItemHandler} className="menu-item">{generateLabels("") || "Add your charity"}</Link>
                                <Link to="/home" onClick={this.menuItemHandler} className="menu-item">{generateLabels("add_studio_label") || "Settings"}</Link>

                            </nav>
                            <div className="my-profile-menu">
                                <Dropdown className="dropdown-block" overlay={myProfileMenu}>
                                    {user.imgUrl ?
                                        <span className="dp-block"><img src={user.imgUrl} alt="" /></span>
                                        :
                                        <Avatar className="dp-block profile-text-avatar">{user.firstName ? user.firstName.charAt(0).toUpperCase() : "S"}</Avatar>
                                    }
                                </Dropdown>
                            </div>
                        </>
                        :
                        <nav className={`main-nav${this.state.menuIsOpen ? " open" : ""}`}>
                            <Link onClick={this.menuItemHandler} to="/add-studio" className="menu-item">{generateLabels("add_studio_label")}</Link>
                            <Link onClick={this.menuItemHandler} to="/signup" className="menu-item">{generateLabels("signup_label")}</Link>
                            <Link onClick={this.menuItemHandler} to="/login" className="menu-item">{generateLabels("login_label")}</Link>
                        </nav>
                    }
                </div>
                {/* <section className="header-top-block"> 
                    <div className={ "right-block toggled-mobile"} >
                        {user && user.email ? (
                            <div className="user-profile icon-block">
                                {user.email} logged
                                <Link
                                    to={""}
                                    onClick={this.logout.bind(this)}
                                    className="link-item"
                                >
                                    <Icon type="lock" theme="filled" />{" "}
                                    {generateLabels("signout") || "Sign Out"}
                                </Link>
                            </div>
                        ) : null}
                    </div>
                </section> */}
            </header >
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
