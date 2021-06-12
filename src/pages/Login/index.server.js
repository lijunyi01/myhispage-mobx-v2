import request from '@/axios/axios';

const loginUrl = '/auth/login';

class Services {

    // 登录接口
    login = data => {
        return request({
            url: loginUrl,
            method: 'post',
            data    // 等效于data: data
        })
    }

}

export default new Services();