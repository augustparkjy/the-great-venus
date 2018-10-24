import React, { Component, Fragment } from 'react';
import HomeUI from './HomeUI';
import Animated from 'animated';
import Easing from 'animated/lib/Easing';
import LobbyBackgroundSlider from './LobbyBackgroundSlider';
import LobbyUI from './LobbyUI';
import SettingUI from './SettingUI';
import ShowroomUI from './ShowroomUI';
import ForgeUI from './ForgeUI';
import StageSelectUI from './StageSelectUI';
import ColosseumUI from './ColosseumUI';

const slideDuration = 1500;
const skySlideDuration = 7000;
const skySlideEasing = Easing.bezier(0.3, 1, 0.6, 1);
const slideEasing = Easing.bezier(0.6, 0, 0.2, 1);
const UIFadeInDuration = 600;
const UIFadeOutDuration = 400;
const UIFadeEasing = Easing.bezier(0, 0.7, 0.3, 1);

class Lobby extends Component {

    state = {
        skyOffset: new Animated.Value(0),
        lobbyUIOn: false,
        lobbyUIOffset: new Animated.Value(0),
        settingUIOn: false,
        settingUIOffset: new Animated.Value(0),
        currentUI: null,
        homeBGOffset: new Animated.Value(1),
        homeUIOffset: new Animated.Value(0),
        showroomBGOffset: new Animated.Value(1),
        showroomUIOffset: new Animated.Value(0),
        forgeBGOffset: new Animated.Value(1),
        forgeUIOffset: new Animated.Value(0),
        stageSelectBGOffset: new Animated.Value(-1),
        stageSelectUIOffset: new Animated.Value(0),
        colosseumBGOffset: new Animated.Value(-1),
        colosseumUIOffset: new Animated.Value(0),
        highlightedStatue: 0,
    }

    componentDidMount() {
        this.slideSkyBG({ toValue: -1, duration: skySlideDuration, easing: skySlideEasing });
        this.slideHomeBG({ toValue: 0, duration: skySlideDuration, easing: skySlideEasing });
        setTimeout(() => {
            this.turnOnLobbyUI();
            this.turnOnInnerUI(this.state.homeUIOffset, 'home');
        }, 3000);
    }

    goToShowroom = () => {
        switch(this.state.currentUI) {
            case 'home':
                this.turnOffInnerUI(this.state.homeUIOffset);
                this.slideHomeBG({ toValue: -1, duration: slideDuration, easing: slideEasing });
                break;
            case 'forge':
                this.turnOffInnerUI(this.state.forgeUIOffset);
                this.slideForgeBG({ toValue: 1, duration: slideDuration, easing: slideEasing });
                break;
            case 'stageselect':
                this.turnOffInnerUI(this.state.stageSelectUIOffset);
                this.slideStageSelectBG({ toValue: -1, duration: slideDuration, easing: slideEasing });
                break;
            case 'colosseum':
                this.turnOffInnerUI(this.state.colosseumUIOffset);
                this.setState({ homeBGOffset: new Animated.Value(-1) });
                this.slideColosseumBG({ toValue: -1, duration: slideDuration, easing: slideEasing });
                break;
            default: break;
        }
        this.slideShowroomBG({ toValue: 0, duration: slideDuration, easing: slideEasing });
        setTimeout(() => this.turnOnInnerUI(this.state.showroomUIOffset, 'showroom'), slideDuration - 400);
    }

    goToForge = () => {
        this.turnOffInnerUI(this.state.showroomUIOffset);
        this.slideShowroomBG({ toValue: -1, duration: slideDuration, easing: slideEasing });
        this.slideForgeBG({ toValue: 0, duration: slideDuration, easing: slideEasing });
        setTimeout(() => this.turnOnInnerUI(this.state.forgeUIOffset, 'forge'), slideDuration - 400);
    }
    
    goToStageSelect = () => {
        this.turnOffInnerUI(this.state.showroomUIOffset);
        this.slideShowroomBG({ toValue: 1, duration: slideDuration, easing: slideEasing });
        this.slideStageSelectBG({ toValue: 0, duration: slideDuration, easing: slideEasing });
        setTimeout(() => this.turnOnInnerUI(this.state.stageSelectUIOffset, 'stageselect'), slideDuration - 400);
    }

    goToColosseum = () => {
        switch(this.state.currentUI) {
            case 'home':
                this.turnOffInnerUI(this.state.homeUIOffset);
                this.slideHomeBG({ toValue: 1, duration: slideDuration, easing: slideEasing });
                break;
            case 'showroom':
                this.turnOffInnerUI(this.state.showroomUIOffset);
                this.slideShowroomBG({ toValue: 1, duration: slideDuration, easing: slideEasing });
                break;
            default: break;
        }
        this.slideColosseumBG({ toValue: 0, duration: slideDuration, easing: slideEasing });
        setTimeout(() => this.turnOnInnerUI(this.state.colosseumUIOffset, 'colosseum'), slideDuration - 400);
    }

    goToHome = () => {
        switch(this.state.currentUI) {
            case 'showroom':
                this.turnOffInnerUI(this.state.showroomUIOffset);
                this.slideShowroomBG({ toValue: 1, duration: slideDuration, easing: slideEasing });
                break;
            case 'forge':
                this.turnOffInnerUI(this.state.forgeUIOffset);
                this.slideForgeBG({ toValue: 1, duration: slideDuration, easing: slideEasing });
                break;
            case 'stageselect':
                this.turnOffInnerUI(this.state.stageSelectUIOffset);
                this.slideStageSelectBG({ toValue: -1, duration: slideDuration, easing: slideEasing });
                break;
            case 'colosseum':
                this.turnOffInnerUI(this.state.colosseumUIOffset);
                this.slideColosseumBG({ toValue: -1, duration: slideDuration, easing: slideEasing });
                break;
            default: break;
        }
        this.slideHomeBG({ toValue: 0, duration: slideDuration, easing: slideEasing });
        setTimeout(() => this.turnOnInnerUI(this.state.homeUIOffset, 'home'), slideDuration - 400);
    }

    slideSkyBG = option => Animated.timing(this.state.skyOffset, option).start();

    slideHomeBG = option => Animated.timing(this.state.homeBGOffset, option).start();

    slideShowroomBG = option => Animated.timing(this.state.showroomBGOffset, option).start();
    
    slideForgeBG = option => Animated.timing(this.state.forgeBGOffset, option).start();
    
    slideStageSelectBG = option => Animated.timing(this.state.stageSelectBGOffset, option).start();
    
    slideColosseumBG = option => Animated.timing(this.state.colosseumBGOffset, option).start();

    turnOnLobbyUI = () => {
        this.setState({ lobbyUIOn: true });
        Animated.timing(this.state.lobbyUIOffset, { toValue: 1, duration: UIFadeInDuration, easing: UIFadeEasing }).start();
    }

    turnOffLobbyUI = () => {
        Animated.timing(this.state.lobbyUIOffset, { toValue: 0, duration: UIFadeOutDuration, easing: UIFadeEasing }).start();
        setTimeout(()=>this.setState({ lobbyUIOn: false }), UIFadeOutDuration);
    }
    
    turnOnSettingUI = () => {
        this.setState({ settingUIOn: true });
        Animated.timing(this.state.settingUIOffset, { toValue: 1, duration: UIFadeInDuration, easing: UIFadeEasing }).start();
    }

    turnOffSettingUI = () => {
        Animated.timing(this.state.settingUIOffset, { toValue: 0, duration: UIFadeOutDuration, easing: UIFadeEasing }).start();
        setTimeout(()=>this.setState({ settingUIOn: false }), UIFadeOutDuration);
    }

    turnOnInnerUI = (offset, name) => {
        this.setState({ currentUI: name });
        Animated.timing(offset, { toValue: 1, duration: UIFadeInDuration, easing: UIFadeEasing }).start();
    }

    turnOffInnerUI = (offset) => {
        Animated.timing(offset, { toValue: 0, duration: UIFadeOutDuration, easing: UIFadeEasing }).start();
        setTimeout(()=>this.setState({ currentUI: null }), UIFadeOutDuration);
    }

    handleStatueHighlighted = (no) => this.setState({ highlightedStatue: no });

    renderInnerUI = () => {
        switch(this.state.currentUI) {
            case 'home':
                return <HomeUI
                    offset={this.state.homeUIOffset}
                    onStatueClick={this.goToForge}
                    onShowroomButtonClick={this.goToShowroom}
                    onColosseumButtonClick={this.goToColosseum}
                    {...this.props} />
            case 'showroom':
                return <ShowroomUI
                    offset={this.state.showroomUIOffset}
                    onHomeButtonClick={this.goToHome}
                    onForgeButtonClick={this.goToForge}
                    onStageSelectButtonClick={this.goToStageSelect}
                    onColosseumButtonClick={this.goToColosseum}
                    highlightedStatue={this.state.highlightedStatue}
                    onStatueHighlighted={this.handleStatueHighlighted}
                    {...this.props} />
            case 'forge':
                return <ForgeUI
                    offset={this.state.forgeUIOffset}
                    onBackButtonClick={this.goToShowroom}
                    highlightedStatue={this.state.highlightedStatue}
                    onStatueHighlighted={this.handleStatueHighlighted}
                    {...this.props} />
            case 'stageselect':
                return <StageSelectUI
                    offset={this.state.stageSelectUIOffset}
                    onBackButtonClick={this.goToShowroom}
                    {...this.props} />
            case 'colosseum':
                return <ColosseumUI
                    offset={this.state.colosseumUIOffset}
                    onBackButtonClick={this.goToShowroom}
                    {...this.props} />
            default:
                return null;
        }
    }
    
    render() {
        return (
            <Fragment>
                <LobbyBackgroundSlider
                    skyOffset={this.state.skyOffset}
                    homeOffset={this.state.homeBGOffset}
                    showroomOffset={this.state.showroomBGOffset}
                    colosseumOffset={this.state.colosseumBGOffset}
                    stageSelectOffset={this.state.stageSelectBGOffset}
                    forgeOffset={this.state.forgeBGOffset}
                    {...this.props} />
                {this.renderInnerUI()}
                <LobbyUI
                    offset={this.state.lobbyUIOffset}
                    onSettingButtonClick={this.turnOnSettingUI}
                    {...this.props} />
                {this.state.settingUIOn
                    ? <SettingUI
                        offset={this.state.settingUIOffset}
                        onDismiss={this.turnOffSettingUI}
                        {...this.props} />
                    : null }
            </Fragment>
        );
    }
}

export default Lobby;