import React, { PureComponent } from 'react';
import Loader from "../components/Loader"

export function withAuthentication(Component) {
    return class extends PureComponent {
        state = {
            isLoading: true,
        };
        componentDidMount() {
           

                this.props.authentication().then(res => {
                    // this.props.saveUserInfo(res.userInfo)
                    this.setState({ isLoading: false });
                    if (res.success) {
                        console.log("get invoice")
                    }
                }).catch(err => {
                    console.log(err)
                    this.setState({ isLoading: false });
                    this.props.history.push('/home');
                })
        }
        render() {
            const { isLoading } = this.state;
            if (isLoading) return <Loader />;
            return <Component {...this.props} />;
        }
    };
}