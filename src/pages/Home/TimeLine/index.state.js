import { makeAutoObservable } from 'mobx';
import server from './index.server';

const {
    getAllProjects,  // 获取项目列表
    getProjectItems,  // 获取某一项目的详细信息
    createProject,    // 创建项目
    deleteProject,    // 删除项目
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
    pxPerYear = 1;
    // 当前project id项目历史轴每像素表示几年(原始值，由后端决定，每个项目该值可能不同)
    pxPerYearOrg = 1;
    // 当前project id 对应的其它数据
    activedProjectData = null;
    // 标识canvas内容发生了变化的变量（只观察该变量进行重新渲染，避免多个数据变化导致渲染多次）
    canvasChangeCount = -1;
    // mainContent 的横屏、竖屏模式    true: 横屏、默认   false:竖屏
    mainContentModelFlag = true;
    // mainList 的显示隐藏模式    true：显示、默认   false：隐藏
    mainListModelFlag = true;
    // layout左边主菜单模式   true: 伸展、默认   false：收缩
    layoutMenuModelFlag = true;
    // 年号列表
    nianhaoList = [
        { 'key': '1', 'value': '鲁隐公' },
        { 'key': '2', 'value': '鲁定公' },
        { 'key': '3', 'value': '鲁哀公' },
        { 'key': '4', 'value': '齐桓公' },
        { 'key': '5', 'value': '周共和' },
        { 'key': '6', 'value': '明万历' },
        { 'key': '7', 'value': '明洪武' },
        { 'key': '8', 'value': '清康熙' },
        { 'key': '9', 'value': '清乾隆' },

    ];

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
    setPxPerYearOrg = newValue => {
        this.pxPerYearOrg = newValue;
    }
    setActivedProjectData = newValue => {
        this.activedProjectData = newValue;
    }
    addCanvasChangeCount = () => {
        this.canvasChangeCount++;
    }
    toggleMainContentModelFlag = () => {
        this.mainContentModelFlag = !this.mainContentModelFlag;
    }
    toogleMainListModelFlag = () => {
        this.mainListModelFlag = !this.mainListModelFlag;
    }
    toogleLayoutMenuModelFlag = () => {
        this.layoutMenuModelFlag = !this.layoutMenuModelFlag;
    }

    getAllProjectsMethod = (firstAsActive = false) => {
        getAllProjects().then(res => {
            if (res.status === 0 && res.projectList.length > 0) {
                this.setProjectList(res.projectList);
                // 如果firstAsActive 传了值且传为true，则将第一项设为active
                if (this.activedProjectId === -1 || firstAsActive) {
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
                this.setPxPerYearOrg(res.pxPerYear);
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

    createProjectMethod = (data, callback) => {
        createProject(data).then(res => {
            if (res.status === 0) {
                // console.log("add project successly");
                this.getAllProjectsMethod(true);
                callback();
            }
        })
    }

    deleteProjectMethod = projectId => {
        deleteProject(projectId).then(res => {
            if (res.status === 0) {
                // console.log("add project successly");
                this.getAllProjectsMethod(true);
            }
        })
    }

}

export default new timeLineState();