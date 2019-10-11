import {
    GROUP_LIST,
    GROUP_INFO,
    GROUP_CASH_BACK,
    LOGIN,
    TIMED_TASK,
    Assist_On,
    KEY_WORD,
    CODE,
    PRIZE_LIST,
    POOL_LIST,
    AD_LIST,
    VOTE_AUDIT,
    GET_KEY_CODE,
    INPUT_CHANGE,
    GET_LOTTERY_RULES,
    GET_DRAW_RECODE,
    GET_POOL_CYCLE_LIST,
    SELECT_POOL_CYCLE,
} from './actionTypes.jsx';
import {
    loginHttp,
    getGroupListHttp,
    getTimedTaskHttp,
    getAssistOnHttp,
    getKeyWordHttp,
    conversionCodeHttp,
    getPrizeListHttp,
    getPooListHttp,
    getAdListHttp,
    voteAuditHttp,
    getKeyCodeHttp,
    getLotteryRulesHttp,
    getDrawRecordHttp,
    getPoolCycleListHttp,
    getGroupInfoHttp,
    groupCashBackListHttp,
    selectPoolCycleListHttp,
} from '../../http/http.jsx';

//验证token是否过去
const tokenIsOverdue = (errcode) => {
    if (errcode == 114 || errcode == 120) {
        window.location.hash = '/';
    }
};

//登录
const loginAction = data => ({type: LOGIN, payload: data});
export const login = params => dispatch => {
    loginHttp(params).then(res => {
        const data = res.data;
        const action = loginAction(data);
        dispatch(action);
    })
};

//获取群列表
const getGroupListAction = data => ({type: GROUP_LIST, payload: data});
export const getGroupList = params => dispatch => {
    getGroupListHttp(params).then(res => {
        const data = res.data;
        tokenIsOverdue(data.errcode);
        const action = getGroupListAction(data);
        dispatch(action);
    })
};

//获取群详情
const getGroupInfoAction = data => ({type: GROUP_INFO, payload: data});
export const getGroupInfo = params => dispatch => {
    getGroupInfoHttp(params).then(res => {
        const data = res.data;
        tokenIsOverdue(data.errcode);
        const action = getGroupInfoAction(data);
        dispatch(action);
    })
};

//获取群主分配列表
const groupCashBackListAction = data => ({type: GROUP_CASH_BACK, payload: data});
export const groupCashBackList = params => dispatch => {
    groupCashBackListHttp(params).then(res => {
        const data = res.data;
        tokenIsOverdue(data.errcode);
        const action = groupCashBackListAction(data);
        dispatch(action);
    })
};

//矿池收益列表
const getPoolCycleAction = data => ({type: GET_POOL_CYCLE_LIST, payload: data});
export const getPoolCycleList = params => dispatch => {
    getPoolCycleListHttp(params).then(res => {
        const data = res.data;
        tokenIsOverdue(data.errcode);
        const action = getPoolCycleAction(data);
        dispatch(action);
    })
};

//矿池收益筛选列表
const selectPoolCycleListAction = data => ({type: SELECT_POOL_CYCLE, payload: data});
export const selectPoolCycleList = params => dispatch => {
    selectPoolCycleListHttp(params).then(res => {
        const data = res.data;
        tokenIsOverdue(data.errcode);
        const action = selectPoolCycleListAction(data);
        dispatch(action);
    })
};

//获取定时任务
const getTimedTaskAction = data => ({type: TIMED_TASK, payload: data});
export const getTimedTask = params => dispatch => {
    getTimedTaskHttp(params).then(res => {
        const data = res.data;
        tokenIsOverdue(data.errcode);
        const action = getTimedTaskAction(data);
        dispatch(action);
    })
};

//获取赞踩记录
const getAssistOnAction = data => ({type: Assist_On, payload: data});
export const getAssistOn = params => dispatch => {
    getAssistOnHttp(params).then(res => {
        const data = res.data;
        tokenIsOverdue(data.errcode);
        const action = getAssistOnAction(data);
        dispatch(action);
    })
};

//关键字
const getKeyWordAction = data => ({type: KEY_WORD, payload: data});
export const getKeyWord = params => dispatch => {
    getKeyWordHttp(params).then(res => {
        const data = res.data;
        tokenIsOverdue(data.errcode);
        const action = getKeyWordAction(data);
        dispatch(action);
    })
};

//兑换码
const conversionCodeAction = data => ({type: CODE, payload: data});
export const conversionCode = params => dispatch => {
    conversionCodeHttp(params).then(res => {
        const data = res.data;
        tokenIsOverdue(data.errcode);
        const action = conversionCodeAction(data);
        dispatch(action);
    })
};

//获取抽奖规则
const getLotteryRulesAction = data => ({type: GET_LOTTERY_RULES, payload: data});
export const getLotteryRules = params => dispatch => {
    getLotteryRulesHttp(params).then(res => {
        const data = res.data;
        tokenIsOverdue(data.errcode);
        const action = getLotteryRulesAction(data);
        dispatch(action);
    })
};

//奖品设置列表
const getPrizeListAction = data => ({type: PRIZE_LIST, payload: data});
export const getPrizeList = params => dispatch => {
    getPrizeListHttp(params).then(res => {
        const data = res.data;
        tokenIsOverdue(data.errcode);
        const action = getPrizeListAction(data);
        dispatch(action);
    })
};

//获取抽奖记录
const getDrawRecordAction = data => ({type: GET_DRAW_RECODE, payload: data});
export const getDrawRecord = params => dispatch => {
    getDrawRecordHttp(params).then(res => {
        const data = res.data;
        tokenIsOverdue(data.errcode);
        const action = getDrawRecordAction(data);
        dispatch(action);
    })
};

//获取矿池审核列表
const getPooListAction = data => ({type: POOL_LIST, payload: data});
export const getPooList = params => dispatch => {
    getPooListHttp(params).then(res => {
        const data = res.data;
        tokenIsOverdue(data.errcode);
        const action = getPooListAction(data);
        dispatch(action);
    })
};

//获取矿池审核列表
const getAdListAction = data => ({type: AD_LIST, payload: data});
export const getAdList = params => dispatch => {
    getAdListHttp(params).then(res => {
        const data = res.data;
        tokenIsOverdue(data.errcode);
        const action = getAdListAction(data);
        dispatch(action);
    })
};

//投票审核
const voteAuditAction = data => ({type: VOTE_AUDIT, payload: data});
export const voteAudit = params => dispatch => {
    voteAuditHttp(params).then(res => {
        const data = res.data;
        tokenIsOverdue(data.errcode);
        const action = voteAuditAction(data);
        dispatch(action);
    })
};

//获取keyCode
const getKeyCodeAction = data => ({type: GET_KEY_CODE, payload: data});
export const getKeyCode = params => dispatch => {
    getKeyCodeHttp(params).then(res => {
        const data = res.data;
        tokenIsOverdue(data.errcode);
        const action = getKeyCodeAction(data);
        dispatch(action);
    })
};

//输入框赋值
export const inputChange = params => dispatch => {
    const action = {type: INPUT_CHANGE, payload: params};
    dispatch(action);
};