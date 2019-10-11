import { ajax, uploadImg} from './axios.jsx';

//登录
export const loginHttp = params => ajax('/api/bot_web/admin/login.php',params);

//获取群列表
export const getGroupListHttp = params => ajax('/api/bot_web/admin/group_list.php',params);

//获取群详情
export const getGroupInfoHttp = params => ajax('/api/bot_web/admin/group_info_new.php',params);

//获取群主奖励列表
export const groupCashBackListHttp = params => ajax('/api/bot_web/admin/group_cashback_list.php',params);

//编辑群
export const editGroupListHttp = params => ajax('/api/bot_web/admin/group_edit.php',params);


//获取定时任务
export const getTimedTaskHttp = params => ajax('/api/bot_web/admin/timer_list.php',params);

//添加定时任务
export const addTimedTaskHttp = params => ajax('/api/bot_web/admin/timer_add.php',params);

//编辑定时任务
export const editTimedTaskHttp = params => ajax('/api/bot_web/admin/timer_edit.php',params);

//删除定时任务
export const deleteTimedTaskHttp = params => ajax('/api/bot_web/admin/timer_del.php',params);

//获取赞踩记录
export const getAssistOnHttp = params => ajax('/api/bot_web/admin/glory_integral_list.php',params);

//关键字列表
export const getKeyWordHttp = params => ajax('/api/bot_web/admin/key_words_list.php',params);

//添加关键字
export const addKeyWordHttp = params => ajax('/api/bot_web/admin/key_words_add.php',params);

//删除关键字
export const deleteKeyWordHttp = params => ajax('/api/bot_web/admin/key_words_del.php',params);

//编辑关键字
export const editKeyWordHttp = params => ajax('/api/bot_web/admin/key_words_edit.php',params);

//兑换码
export const conversionCodeHttp = params => ajax('/api/bot_web/admin/voucher/voucher_list.php',params);

//生成兑换码
export const generateHttp = params => ajax('/api/la/admin/voucher/voucher_add.php',params);

//获取抽奖规则
export const getLotteryRulesHttp = params => ajax('/api/bot_web/admin/prize/prize_config_value.php', params);

//设置抽奖规则
export const setLotteryRulesHttp = params => ajax('/api/bot_web/admin/prize/prize_config_edit.php', params);

//获取奖品设置列表
export const getPrizeListHttp = params => ajax('/api/bot_web/admin/prize/prize_list.php',params);

//删除奖品设置列表中的某一项
export const deletePrizeItemHttp = params => ajax('/api/bot_web/admin/prize/prize_del.php',params);

//编辑商品设置列表中某一项
export const editPrizeItemHttp = params => ajax('/api/bot_web/admin/prize/prize_edit.php',params);

//获取抽奖记录
export const getDrawRecordHttp = params => ajax('/api/bot_web/admin/prize/prize_order_list.php',params);

//中奖设置
export const prizeSetHttp = params => ajax('/api/bot_web/admin/prize/prize_add.php',params);

//获取矿池审核列表
export const getPooListHttp = params => ajax('/api/bot_web/admin/apply_list.php', params);

//获取广告审核列表
export const getAdListHttp = params => ajax('/api/bot_web/admin/advertising/advertising_list.php', params);

//处理广告审核
export const auditAd = params => ajax('/api/bot_web/admin/advertising/advertising_audit.php', params);

//投票审核
export const voteAuditHttp = params => ajax('/api/bot_web/admin/vote/vote_list.php', params);

//处理投票
export const submitVoteAuditHttp = params => ajax('/api/bot_web/admin/vote/vote_audit.php', params);

//获取keyCode
export const getKeyCodeHttp = params => ajax('/api/la/admin/configure/get_key_code.php', params);

//获取矿池周期收益
export const getPoolCycleListHttp = params => ajax('/api/bot_web/admin/group_cashback_parent_list.php', params);

//周期筛选列表
export const selectPoolCycleListHttp = params => ajax('/api/bot_web/admin/unlock_time_list.php', params);

//上传图片
export const uploadImgHttp = (params, suc_func, error_func, progress_func = null) => {
    const api_url = '/api/plugin/upload_file.php';
    const api_data = params;
    uploadImg(api_url, api_data, suc_func, error_func, progress_func);
};