import { combineReducers } from 'redux';
import userModule from './userModule';
import web3Module from './web3Module';
import appModule from './appModule';
import adminModule from './adminModule';
import gameModule from './gameModule';

export default combineReducers({ web3Module, userModule, appModule, adminModule, gameModule });