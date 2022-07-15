import React, { Component } from "react";
function propProxyCom(WrappedComponent) {
    return class PropProxyComponent extends Component {
        render() {
            const { author, ...otherProps } = this.props;
            return <WrappedComponent author={author} {...otherProps} />
        }
    }
};
export default propProxyCom;