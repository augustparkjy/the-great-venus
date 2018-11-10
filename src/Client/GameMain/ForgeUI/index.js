import React, { Component, Fragment } from 'react';
import FlatButton from 'Client/Components/FlatButton';
import Animated from 'animated';
import StatueSelector from './StatueSelector';
import EquipDisplayContainer from './EquipDisplayContainer';
import { connect } from 'react-redux';

const AnimatedFlatButton = Animated.createAnimatedComponent(FlatButton);

class ForgeUI extends Component {

    render() {
        const { offset, width, height } = this.props;
        return (
            <Fragment>
                <StatueSelector
                    x={width/8}
                    y={height/8}
                    width={width/5}
                    height={height*5/8}
                    offset={1}
                    currentSelectedStatue={this.props.currentSelectedStatue}
                    onClickStatue={this.props.onClickStatue} />
                <EquipDisplayContainer
                    x={width*2/5}
                    y={height/8}
                    width={width/2}
                    height={height*5/8}
                    offset={offset}
                    currentSelectedStatue={this.props.currentSelectedStatue} />
                <AnimatedFlatButton
                    x={width + this.props.contentX - 200}
                    y={offset.interpolate({ inputRange: [0, 1], outputRange: [height + this.props.contentY, height + this.props.contentY - 50] })}
                    alpha={offset}
                    width={180}
                    height={36}
                    text={'DONE'}
                    onClick={this.props.onBackButtonClick} />
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        contentX: state.canvasModule.contentX,
        contentY: state.canvasModule.contentY,
    }),
)(ForgeUI);