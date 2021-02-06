import { makeAutoObservable } from 'mobx';
import server from './index.server';

const {
    getAllProjects,  // 获取项目列表
    getProjectItems,  // 获取某一项目的详细信息
} = server;

class timeLineState {

    // mobx6.0开始state要加这个构造函数; 且属性前不用加@observable,方法前不用加@action
    constructor() {
        makeAutoObservable(this);
    }

    // main content 这部分（历史线图部分）dom的宽高
    mainContentDivWidth = 0;
    mainContentDivHeight = 0;

    // 项目列表
    projectList = [];
    // 当前project id
    activedProjectId = -1;
    // 当前project id 对应的items
    activedProjectItems = [];
    // 当前project id项目历史轴每像素表示几年
    pxPerYear = -1;
    // 当前project id 对应的其它数据
    activedProjectData = null;
    // 标识canvas内容发生了变化的变量（只观察该变量进行重新渲染，避免多个数据变化导致渲染多次）
    canvasChangeCount = -1;

    setMainContentDivWidth = newValue => {
        this.mainContentDivWidth = newValue;
    }
    setMainContentDivHeight = newValue => {
        this.mainContentDivHeight = newValue;
    }
    setProjectList = newValue => {
        this.projectList = newValue;
    }
    setActivedProjectId = newValue => {
        this.activedProjectId = newValue;
    }
    setActivedProjectItems = newValue => {
        this.activedProjectItems = newValue;
    }
    setPxPerYear = newValue => {
        this.pxPerYear = newValue;
    }
    setActivedProjectData = newValue => {
        this.activedProjectData = newValue;
    }
    addCanvasChangeCount = () => {
        this.canvasChangeCount++;
    }

    getAllProjectsMethod = () => {
        getAllProjects().then(res => {
            //处理接口拿到的结果
            // console.log("res:", res);
            if (res.status === 0 && res.projectList.length > 0) {
                this.setProjectList(res.projectList);
                if (this.activedProjectId === -1) {
                    this.setActivedProjectId(res.projectList[0].id);
                }
            }
        })
    }

    getProjectItemsMethod = projectId => {
        getProjectItems(projectId).then(res => {
            //处理接口拿到的结果
            // console.log("res:", res);
            if (res.status === 0) {
                this.setActivedProjectItems(res.itemBeanList);
                this.setPxPerYear(res.pxPerYear);
                const earlyYear = res.earlyYear;
                const lastYear = res.lastYear;
                const timeLineBeginYear = res.timeLineBeginYear;
                const yearInterval = res.yearInterval;
                this.setActivedProjectData({ earlyYear, lastYear, timeLineBeginYear, yearInterval });
                // 设置canvas重绘标志
                this.addCanvasChangeCount();
            }
        })
    }

}

export default new timeLineState();