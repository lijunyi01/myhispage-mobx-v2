import { makeAutoObservable } from 'mobx';

class mapState {

    // mobx6.0开始state要加这个构造函数; 且属性前不用加@observable,方法前不用加@action
    constructor() {
        makeAutoObservable(this);
    }

    map = null;

    setMap = (newValue) => {
        this.map = newValue;
    }
}

export default new mapState();