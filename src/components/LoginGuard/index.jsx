import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const withLoginGuard = (Com) => {
    return class PropProxyComponent extends Component {
        render() {
            const { author, ...otherProps } = this.props;
            return <Com author={author} {...otherProps} />
        }
    }
};
const LoginGuard = ({ Com, Jsx }) => {
    // console.log(Com, Jsx);
    // if (Com) return <Com />;
    // if(Jsx)return{jsx}
    const adminInfo = useSelector(state => state.admin.adminInfo);
    if (!adminInfo) return <Navigate to={"/login"} />
};
export { withLoginGuard, LoginGuard }