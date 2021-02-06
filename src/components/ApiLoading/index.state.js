import { makeAutoObservable } from 'mobx';

class LoadingState {

    // mobx6.0开始state要加这个构造函数; 且属性前不用加@observable,方法前不用加@action
    constructor() {
        makeAutoObservable(this);
    }

    // 全局loading 标志位
    apiLoading = false;
    // 记录当前页面总共请求的次数
    loadingRequestsCount = 0;

    showLoading = (changeStatus = true) => {
        // console.log('set apiLoading true');
        //changeStatus = true 时，当原本的loadingRequestsCount值为0时，需要将apiLoading标志位改为true
        if (this.loadingRequestsCount === 0 && changeStatus) {
            this.apiLoading = true;
        }
        this.loadingRequestsCount++;
    }

    hideLoading = (isLoading = true) => {
        if (this.loadingRequestsCount <= 0) return;
        this.loadingRequestsCount--;
        // 入参指明isLoading 为false（不在loading状态了）时，将loadingRequestsCount置0
        if (!isLoading) {
            this.loadingRequestsCount = 0;
        }
        // loadingRequestsCount为0了，或者入参指明不在loading状态时，将apiLoading标志位改为false
        if (this.loadingRequestsCount === 0 || !isLoading) {
            this.apiLoading = false;
        }
    }

}

export default new LoadingState();

