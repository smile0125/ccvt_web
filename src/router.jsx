import AsyncComponent from './components/AsyncComponent/index.jsx';

export default [
    {
        id: 1,
        path:'/group/:num',
        component: AsyncComponent(() => import(/* webpackChunkName: "group" */'./components/GroupList/index.jsx'))
    },
    {
        id: 2,
        path:'/editGroup/:num',
        component: AsyncComponent(() => import(/* webpackChunkName: "group" */'./components/GroupList/editGroup.jsx'))
    },
    {
        id: 3,
        path:'/task/:num',
        component: AsyncComponent(() => import(/* webpackChunkName: "task" */'./components/TimedTask/index.jsx'))
    },
    {
        id: 3,
        path:'/assist/:num',
        component: AsyncComponent(() => import(/* webpackChunkName: "assist" */'./components/AssistOn/index.jsx'))
    },
    {
        id: 4,
        path:'/key/:num',
        component: AsyncComponent(() => import(/* webpackChunkName: "keyCode" */'./components/KeyWord/index.jsx'))
    },
    {
        id: 5,
        path:'/code/:num',
        component: AsyncComponent(() => import(/* webpackChunkName: "code" */'./components/Code/index.jsx'))
    },
    {
        id: 6,
        path:'/lottery/:num',
        component: AsyncComponent(() => import(/* webpackChunkName: "lottery" */'./components/Lottery/index.jsx'))
    },
    {
        id: 7,
        path:'/prize/:num',
        component: AsyncComponent(() => import(/* webpackChunkName: "lottery" */'./components/Lottery/prizeList.jsx'))
    },
    {
        id: 8,
        path:'/drawRecord/:num',
        component: AsyncComponent(() => import(/* webpackChunkName: "lottery" */'./components/Lottery/drawRecord.jsx'))
    },
    {
        id: 9,
        path:'/pool/:num',
        component: AsyncComponent(() => import(/* webpackChunkName: "pool" */'./components/PoolAudit/index.jsx'))
    },
    {
        id: 10,
        path:'/ad/:num',
        component: AsyncComponent(() => import(/* webpackChunkName: "ad" */'./components/AdAudit/index.jsx'))
    },
    {
        id: 11,
        path:'/vote/:num',
        component: AsyncComponent(() => import(/* webpackChunkName: "vote" */'./components/VoteAudit/index.jsx'))
    },
    {
        id: 12,
        path:'/cycle/:num',
        component: AsyncComponent(() => import(/* webpackChunkName: "vote" */'./components/PoolCycle/index.jsx'))
    },
    {
        id: 13,
        path:'/groupInfo/:num',
        component: AsyncComponent(() => import(/* webpackChunkName: "vote" */'./components/GroupList/groupInfo.jsx'))
    }
]