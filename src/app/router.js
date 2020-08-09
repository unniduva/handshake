import React, { Component } from "react";
import { Route, Redirect, Router, Switch } from "react-router-dom";
import asyncComponent from "./helpers/async-func";
import Layout from "./components/layout";
import { getJsonCookies } from "../app/helpers/utility";

const RestrictedRoute = ({ component: Component, layoutSettings = {}, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            getJsonCookies() ? (
                <Layout settings={layoutSettings} {...props}>
                    <Component {...props} settings={layoutSettings} />
                </Layout>
            ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

const UnRestrictedRoute = ({ component: Component, layoutSettings = {}, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !getJsonCookies() ? (
                <Layout settings={layoutSettings} {...props}>
                    <Component {...props} settings={layoutSettings} />
                </Layout>
            ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

const PublicRoute = ({ component: Component, layoutSettings = {}, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            <Layout settings={layoutSettings}>
                <Component {...props} settings={layoutSettings} />
            </Layout>
        }
    />
);

export default class extends Component {

    render() {
        const { history } = this.props;

        return (
            <Router history={history}>
                <Switch>

                    <UnRestrictedRoute
                        exact
                        path={"/login"}
                        layoutSettings={{
                            title: "Login", topbar: false, footer: false

                        }}
                        component={asyncComponent(() => import("./pages/user/login"))}
                    />
                    <UnRestrictedRoute
                        exact
                        path={"/signup"}
                        layoutSettings={{
                            title: "Signin", topbar: false, footer: false

                        }}
                        component={asyncComponent(() => import("./pages/user/signup"))}
                    />
                    <UnRestrictedRoute
                        exact
                        path={"/forgot-password"}
                        layoutSettings={{
                            title: "Forgot password", topbar: true,
                        }}
                        component={asyncComponent(() => import("./pages/user/forgot"))}
                    />
                    <UnRestrictedRoute
                        exact
                        path={"/reset-password"}
                        layoutSettings={{
                            title: "Reset password", topbar: false, footer: false
                        }}
                        component={asyncComponent(() => import("./pages/user/reset"))}
                    />
                    <PublicRoute
                        exact
                        path={"/"}
                        layoutSettings={{
                            title: "Home",
                            topbar: true,
                            sidebar: false
                        }}
                        component={asyncComponent(() => import("./pages/home"))}
                    />

                    {/* <PublicRoute
                        exact
                        path={"/about"}
                        layoutSettings={{
                            title: "",
                            type: "about",
                            topbar: true,
                            sidebar: false
                        }}
                        component={asyncComponent(() => import("./components/staticpages"))}
                    />
                    <PublicRoute
                        exact
                        path={"/contact"}
                        layoutSettings={{
                            title: "",
                            type: "contact",
                            topbar: true,
                            sidebar: false
                        }}
                        component={asyncComponent(() => import("./components/staticpages"))}
                    />
                    <PublicRoute
                        exact
                        path={"/privacy"}
                        layoutSettings={{
                            title: "",
                            type: "privacy",
                            topbar: true,
                            sidebar: false
                        }}
                        component={asyncComponent(() => import("./components/staticpages"))}
                    />
                    <PublicRoute
                        exact
                        path={"/terms"}
                        layoutSettings={{
                            title: "",
                            type: "terms",
                            topbar: true,
                            sidebar: false
                        }}
                        component={asyncComponent(() => import("./components/staticpages"))}
                    />
                    <PublicRoute
                        exact
                        path={"/howitworks"}
                        layoutSettings={{
                            title: "",
                            type: "howitworks",
                            topbar: true,
                            sidebar: false
                        }}
                        component={asyncComponent(() => import("./components/staticpages"))}
                    />
                    <PublicRoute
                        exact
                        path={"/studiofees"}
                        layoutSettings={{
                            title: "",
                            type: "studiofees",
                            topbar: true,
                            sidebar: false
                        }}
                        component={asyncComponent(() => import("./components/staticpages"))}
                    />
                    <PublicRoute
                        exact
                        path={"/trustandsafety"}
                        layoutSettings={{
                            title: "",
                            type: "trustandsafety",
                            topbar: true,
                            sidebar: false
                        }}
                        component={asyncComponent(() => import("./components/staticpages"))}
                    />
                    <PublicRoute
                        exact
                        path={"/faq"}
                        layoutSettings={{
                            title: "",
                            type: "faq",
                            topbar: true,
                            sidebar: false
                        }}
                        component={asyncComponent(() => import("./components/staticpages"))}
                    /> */}
                    <Route
                        component={asyncComponent(() => import("./pages/not-found"))}
                    />
                </Switch>
            </Router>
        );
    }
}
