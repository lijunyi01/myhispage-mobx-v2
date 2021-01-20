import { makeAutoObservable } from 'mobx';

class timeLineState {

    // mobx6.0开始state要加这个构造函数; 且属性前不用加@observable,方法前不用加@action
    constructor() {
        makeAutoObservable(this);
    }

    test = 0;

    // changetest = () => {
    //     setInterval(() => {
    //         this.test++;
    //         console.log(this.test);
    //     }, 2000)
    // }

    changetest = () => {
        this.test++;
    }
}

export default new timeLineState();