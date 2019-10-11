import {combineReducers} from 'redux';
import loginReducer from './loginReducer.jsx';
import groupListReducer from './groupListReducer.jsx';
import timedTaskReducer from './timedTaskReducer.jsx';
import assistOnReducer from './assistOnReducer.jsx';
import keyWordReducer from './keyWordReducer.jsx';
import conversionCodeReducer from './conversionCodeReducer.jsx';
import prizeListReducer from './prizeListReducer.jsx';
import poolListReducer from './poolListReducer.jsx';
import adListReducer from './adListReducer.jsx';
import voteAuditReducer from './voteAuditReducer.jsx';
import getKeyCodeReducer from "./getKeyCodeReducer.jsx";
import inputChangeReducer from "./inputChangeReducer.jsx";
import drawRecodeReducer from "./drawRecodeReducer.jsx";
import getPoolCycleListReducer from "./getPoolCycleListReducer.jsx";
import getGroupInfoReducer from "./getGroupInfoReducer.jsx";
import getGroupCashBackReducer from "./getGroupCashBackReducer.jsx";
import selectPoolCycleListReducer from "./selectPoolCycleListReducer.jsx";

const rootReducer = combineReducers({
    loginReducer,
    groupListReducer,
    timedTaskReducer,
    assistOnReducer,
    keyWordReducer,
    conversionCodeReducer,
    prizeListReducer,
    poolListReducer,
    adListReducer,
    voteAuditReducer,
    getKeyCodeReducer,
    inputChangeReducer,
    drawRecodeReducer,
    getPoolCycleListReducer,
    getGroupInfoReducer,
    getGroupCashBackReducer,
    selectPoolCycleListReducer,
});
export default rootReducer;