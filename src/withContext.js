import React from "react";
import Context from "./context/Context";

export default function withContext(Child) {
    return function WrapperComponent(props) {
        return (

            <Context.Consumer>
                {(xState) => (
                    <Child {...props} venueContext={xState}/>
                )}
            </Context.Consumer>

        );
    };
}