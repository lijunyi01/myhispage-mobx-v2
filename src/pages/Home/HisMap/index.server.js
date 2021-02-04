import request from '@/axios/axios';
// import config from '@config/config';

// const { BASE_URL } = config;
const jiekouUrl1 = '/pare_bi_data_process/manage/getAdata';

class Services {

    // 某接口示例
    getAData = (userName, userId) => {
        return request({
            url: jiekouUrl1,
            method: 'post',
            data: { userName, userId }
        })
    }

}

export default new Services();