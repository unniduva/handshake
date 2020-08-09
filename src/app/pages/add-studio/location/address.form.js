import React, { Component } from "react";
import { compose } from "recompose";
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";
import config from "../../../../config";
import {  Input } from "antd";

class AddressForm extends Component {
    render() {
        const { search, place } = this.props.addressData;
        return (
            <ReactGoogleMapLoader
                params={{
                    key: config.mapKey,
                    libraries: "places,geocode",
                }}
                render={googleMaps =>
                    googleMaps && (
                        <div className="form-group">
                            <ReactGooglePlacesSuggest
                                autocompletionRequest={{
                                    input: search
                                }}
                                googleMaps={googleMaps}
                                onSelectSuggest={this.props.handleSelectSuggest}
                            >
                                <Input
                                    onChange={this.props.handleAddressChange}
                                    value={place}
                                />
                            </ReactGooglePlacesSuggest>
                        </div>
                    )
                }
            />
        );
    }
}


export default compose()(AddressForm);


