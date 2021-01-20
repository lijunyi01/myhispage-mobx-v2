import { makeAutoObservable } from 'mobx';

class timeLineState {

    // mobx6.0开始state要加这个构造函数; 且属性前不用加@observable,方法前不用加@action
    constructor() {
        makeAutoObservable(this);
    }

    // main content 这部分（历史线图部分）dom的宽高
    mainContentDivWidth = 0;
    mainContentDivHeight = 0;

    // changetest = () => {
    //     setInterval(() => {
    //         this.test++;
    //         console.log(this.test);
    //     }, 2000)
    // }

    setMainContentDivWidth = (newValue) => {
        this.mainContentDivWidth = newValue;
    }
    setMainContentDivHeight = (newValue) => {
        this.mainContentDivHeight = newValue;
    }
}

export default new timeLineState();