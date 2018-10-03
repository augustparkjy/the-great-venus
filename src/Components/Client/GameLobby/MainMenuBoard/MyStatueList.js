import React, { Component } from 'react';
import { Container } from 'react-pixi-fiber';
import Animated from 'animated';
import StatueSpriteRoller from './StatueSpriteRoller';
import StatueEditor from './StatueEditor';
import StatueStatusView from './StatueStatusView';
import $ from 'jquery';

class MyStatueList extends Component {

    state = {
        currentSelected: 0,
        currentSelectedOffset: new Animated.Value(0),
        editorOn: false,
        editorOffset: new Animated.Value(0),
        statues: [
            {
                name: "HaeTae",
                hp: 20,
                atk: 30,
                def: 10,
                crt: 12,
                avd: 5
            },
            {
                name: "Guiliano",
                hp: 24,
                atk: 100,
                def: 29,
                crt: 15,
                avd: 5
            },
            {
                name: "Agrippa",
                hp: 32,
                atk: 150,
                def: 55,
                crt: 15,
                avd: 5
            },
        ]
    }

    componentDidMount = () => {
        $(document).on('mousewheel DOMMouseScroll', (e) => {
            const E = e.originalEvent;
            if (E.detail) { // if firefox
                if(E.detail > 0) this.onMouseWheelDown();
                else this.onMouseWheelUp();
            } else {
                if(E.wheelDelta < 0) this.onMouseWheelDown();
                else this.onMouseWheelUp();
            };
        });
    }

    componentWillUnmount = () => $(document).off('mousewheel DOMMouseScroll');

    onMouseWheelDown = () => {
        if(!this.state.editorOn && this.state.currentSelected > 0) this.toNthStatue(this.state.currentSelected-1);
    }

    onMouseWheelUp = () => {
        if(!this.state.editorOn && this.state.currentSelected < 10) this.toNthStatue(this.state.currentSelected+1);
    }

    toNthStatue = (N) => {
        this.setState({ currentSelected: N });
        Animated.timing(this.state.currentSelectedOffset, { toValue: N });
    }

    onEditStart = (N) => {
        this.toNthStatue(N);
        this.setState({ editorOn: true });
        Animated.timing(this.state.editorOffset, { toValue: 1 });
    }

    onEditFinish = () => {
        this.setState({ editorOn: false });
        Animated.timing(this.state.editorOffset, { toValue: 0 });
    }

    render() {

        const { currentSelected, currentSelectedOffset, statues, editorOffset } = this.state;
        return (
            <Container {...this.props}>
                <StatueSpriteRoller
                    statues={statues}
                    offset={currentSelectedOffset}
                    onClickItem={this.onEditStart} />
                <StatueEditor
                    info={statues[currentSelected]}
                    offset={editorOffset} />
                <StatueStatusView
                    status={statues[currentSelected]} />
            </Container>
        );
    }
}

export default Animated.createAnimatedComponent(MyStatueList);