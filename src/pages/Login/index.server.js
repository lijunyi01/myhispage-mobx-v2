import request from '@/axios/axios';

const login = '/auth/login';

class Services {

    // 登录接口
    login = data => {
        return request({
            url: login,
            method: 'post',
            data    // 等效于data: data
        })
    }

}

export default new Services();