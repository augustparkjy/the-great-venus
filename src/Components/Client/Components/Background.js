import React, { Component } from 'react';
import { Container, TilingSprite } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import PropTypes from 'prop-types';
import Animated from 'animated';

const AnimatedContainer = Animated.createAnimatedComponent(Container);
const AnimatedTilingSprite = Animated.createAnimatedComponent(TilingSprite);

class Background extends Component {

    state = {
        themes: {
            'sky1': [
                { src: this.context.app.loader.resources.bg_main1_sky, mouseSensitivity: 0, xSpeed: 0 },
            ],
            'home1': [
                { src: this.context.app.loader.resources.bg_main1_1, mouseSensitivity: 0, xSpeed: 0 },
                { src: this.context.app.loader.resources.bg_main1_2, mouseSensitivity: 1, xSpeed: 1 },
                { src: this.context.app.loader.resources.bg_main1_3, mouseSensitivity: 2, xSpeed: 1.5 },
                { src: this.context.app.loader.resources.bg_main1_4, mouseSensitivity: 3, xSpeed: 0 },
                { src: this.context.app.loader.resources.bg_main1_5, mouseSensitivity: 4, xSpeed: 2 },
                { src: this.context.app.loader.resources.bg_main1_6, mouseSensitivity: 5, xSpeed: 0 },
                { src: this.context.app.loader.resources.bg_main1_7, mouseSensitivity: 6, xSpeed: 2.5 },
            ],
            'home2': [
                { src: this.context.app.loader.resources.bg_main2_1, mouseSensitivity: 0, xSpeed: 0 },
                { src: this.context.app.loader.resources.bg_main2_2, mouseSensitivity: 1, xSpeed: 0 },
                { src: this.context.app.loader.resources.bg_main2_3, mouseSensitivity: 2, xSpeed: 0 },
                { src: this.context.app.loader.resources.bg_main2_4, mouseSensitivity: 3, xSpeed: 0 },
                { src: this.context.app.loader.resources.bg_main2_5, mouseSensitivity: 4, xSpeed: 0 },
                { src: this.context.app.loader.resources.bg_main2_6, mouseSensitivity: 5, xSpeed: 1 },
                { src: this.context.app.loader.resources.bg_main2_7, mouseSensitivity: 6, xSpeed: 1.5 },
                { src: this.context.app.loader.resources.bg_main2_8, mouseSensitivity: 7, xSpeed: 2 },
                { src: this.context.app.loader.resources.bg_main2_9, mouseSensitivity: 8, xSpeed: 0 },
            ],
            'home3': [
                { src: this.context.app.loader.resources.bg_main3_1, mouseSensitivity: 0, xSpeed: 0 },
                { src: this.context.app.loader.resources.bg_main3_2, mouseSensitivity: 1, xSpeed: 1 },
                { src: this.context.app.loader.resources.bg_main3_3, mouseSensitivity: 2, xSpeed: 0 },
                { src: this.context.app.loader.resources.bg_main3_4, mouseSensitivity: 3, xSpeed: 2 },
                { src: this.context.app.loader.resources.bg_main3_5, mouseSensitivity: 4, xSpeed: 0 },
                { src: this.context.app.loader.resources.bg_main3_6, mouseSensitivity: 5, xSpeed: 0 },
                { src: this.context.app.loader.resources.bg_main3_7, mouseSensitivity: 6, xSpeed: 0 },
                { src: this.context.app.loader.resources.bg_main3_8, mouseSensitivity: 7, xSpeed: 0 },
            ],
            'home4': [
                { src: this.context.app.loader.resources.bg_main4_1, mouseSensitivity: 0, xSpeed: 0 },
                { src: this.context.app.loader.resources.bg_main4_2, mouseSensitivity: 1, xSpeed: 1 },
                { src: this.context.app.loader.resources.bg_main4_3, mouseSensitivity: 2, xSpeed: 0 },
                { src: this.context.app.loader.resources.bg_main4_4, mouseSensitivity: 3, xSpeed: 2 },
                { src: this.context.app.loader.resources.bg_main4_5, mouseSensitivity: 4, xSpeed: 0 },
            ],
            'showroom': [
                { src: this.context.app.loader.resources.bg_showroom, mouseSensitivity: 0, xSpeed: 0 },
            ],
            'forge': [
                { src: this.context.app.loader.resources.bg_forge1, mouseSensitivity: 0, xSpeed: 0 },
            ],
            'colosseum_lobby': [
                { src: this.context.app.loader.resources.bg_colosseum_lobby, mouseSensitivity: 0, xSpeed: 0 },
            ],
            'colosseum_field': [
                
            ],
            'stageselect1': [
                { src: this.context.app.loader.resources.bg_stageselect1_1, mouseSensitivity: 0, xSpeed: 0 },
                { src: this.context.app.loader.resources.bg_stageselect1_2, mouseSensitivity: 0, xSpeed: 1 },
                { src: this.context.app.loader.resources.bg_stageselect1_3, mouseSensitivity: 0, xSpeed: 0 },
            ],
            'field1_1': [
                { src: this.context.app.loader.resources.bg_field1_1_1, mouseSensitivity: 0, xSpeed: 0 },
                { src: this.context.app.loader.resources.bg_field1_1_2, mouseSensitivity: 1, xSpeed: 0 },
                { src: this.context.app.loader.resources.bg_field1_1_3, mouseSensitivity: 2, xSpeed: 0 },
                { src: this.context.app.loader.resources.bg_field1_1_4, mouseSensitivity: 3, xSpeed: 0 },
                { src: this.context.app.loader.resources.bg_field1_1_5, mouseSensitivity: 4, xSpeed: 0 },
                { src: this.context.app.loader.resources.bg_field1_1_6, mouseSensitivity: 5, xSpeed: 0 },
                { src: this.context.app.loader.resources.bg_field1_1_7, mouseSensitivity: 6, xSpeed: 0 },
            ],
        },
        mousePosition: new PIXI.Point(this.props.stageWidth/2, this.props.stageHeight/2),
        x: 0
    }
    
    componentDidMount() {
        this.context.app.ticker.add(this.moving);
    }

    moving = () => {
        this.setState((state) => ({ x: state.x + 0.05 }))
    }

    handleMouseMove = (event) => {
        this.setState({ mousePosition: event.data.global });
    }

    render() {
        const { stageWidth, stageHeight, contentWidth, contentHeight } = this.props;
        return (
            <AnimatedContainer
                interactive
                mousemove={this.handleMouseMove}
                x={typeof this.props.offsetX === 'number'
                    ? this.props.offsetX
                    : this.props.offsetX.interpolate({
                        inputRange: [-1, 1],
                        outputRange: [-contentWidth, contentWidth]
                })}
                y={typeof this.props.offsetY === 'number'
                    ? this.props.offsetY
                    : this.props.offsetY.interpolate({
                        inputRange: [-1, 1],
                        outputRange: [-contentHeight, contentHeight]
                })} >

                {this.state.themes[this.props.theme].map(({ src, mouseSensitivity, xSpeed }, i)=>
                    <AnimatedTilingSprite
                        key={i}
                        texture={src.texture}
                        width={contentWidth}
                        height={contentHeight}
                        anchor={[0.5, 0.5]}
                        position={[stageWidth/2, stageHeight/2]}
                        tilePosition={[
                            (contentWidth - 1920)/2 + (this.state.mousePosition.x - contentWidth/2) * mouseSensitivity * 0.002 + this.state.x*xSpeed,
                            (contentHeight - 1080)/2 + (this.state.mousePosition.y - contentHeight/2) * mouseSensitivity * 0.002
                        ]}
                         />
                )}
            </AnimatedContainer>
        );
    }
}

Background.contextTypes = {
    app: PropTypes.object,
};

export default Background;