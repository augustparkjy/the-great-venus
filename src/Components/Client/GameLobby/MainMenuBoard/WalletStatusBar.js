import React, { Component } from 'react';
import { Container, Text } from 'react-pixi-fiber';
import { connect } from 'react-redux';

class WalletStatusBar extends Component {
    render() {
        return (
            <Container {...this.props}>
                <Text text={`골드: ${this.props.userData.gold}`} style={{ fill: 0xffffff, fontSize: 18 }}/>
                <Text y={30} text={`이더리움: ${this.props.balance} (Gwei)`} style={{ fill: 0xffffff, fontSize: 18 }}/>
            </Container>
        );
    }
}

export default connect(
    (state) => ({
        userData: state.userModule.userData,
        balance: state.userModule.balance
    })
)(WalletStatusBar);