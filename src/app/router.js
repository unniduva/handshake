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
                            title: "Login", topbar: true,

                        }}
                        component={asyncComponent(() => import("./pages/user/login"))}
                    />
                    <UnRestrictedRoute
                        exact
                        path={"/signup"}
                        layoutSettings={{
                            title: "Signin", topbar: true,

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
                            title: "Reset password", topbar: true,
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
                    
                    <RestrictedRoute
                        exact
                        path={"/warningDetail/:id?"}
                        layoutSettings={{
                            title: "Warning detail",
                            topbar: true,
                            sidebar: false
                        }}
                        component={asyncComponent(() => import("./components/notification/detail"))}
                    />
                   
                    <RestrictedRoute
                        exact
                        path={"/my-profile"}
                        layoutSettings={{
                            title: "My Profile",
                            topbar: true,
                            sidebar: false
                        }}
                        component={asyncComponent(() => import("./pages/user/my-profile"))}
                    />
                    <RestrictedRoute
                        exact
                        path={"/notifications"}
                        layoutSettings={{
                            title: "Notifications",
                            topbar: true,
                            sidebar: false
                        }}
                        component={asyncComponent(() => import("./components/notification/index"))}
                    />
                    <PublicRoute
                        exact
                        path={"/cms/:type?"}
                        layoutSettings={{
                            title: "",
                            topbar: true,
                            sidebar: false
                        }}
                        component={asyncComponent(() => import("./components/staticpages"))}
                    />
                    
                    <Route
                        component={asyncComponent(() => import("./pages/not-found"))}
                    />
                </Switch>
            </Router>
        );
    }
}
