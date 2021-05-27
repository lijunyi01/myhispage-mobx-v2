import Mock from 'mockjs'

let mockInfo = {
    "code": 0,
    "data": {
        "name": "ljy"
    }
}

let mockInfo2 = {
    "code": 0,
    "data": {
        "name": "jr"
    }
}

Mock.setup({
    timeout: 1000
})

Mock.mock(
    '/data2/test',
    'post',
    data => {
        if (data === "1") {
            return mockInfo
        } else {
            return mockInfo2
        }
    }
)

let loginSuccessResp = {
    "messageCode": "S100001",
    "status": 0,
    "token": "eyJhbGciOiJIUzUxMiJ9.eyJ1bWlkIjoiMSIsImNyZWF0ZWQiOjE2MjIwMjg5MzAwODcsInRhYmxlaW5kZXgiOiIwIiwiZXhwIjoxNjIyNjMzNzMwfQ.86mTj2Rbo3sAO4HEATHiIXfqvZ7DYLZD7jkAN2wk68rKsjiOytWvdIxGoVkLwCFZ47p6Ig1XfFkV5FANKwl88g",
    "umid": 1
}

let loginFailResp = {
    "messageCode": "E100002",
    "status": 20,
    "token": "",
    "umid": 0
}

// /auth/login
Mock.mock(
    '/auth/login2',   // 如要让mock拦截请求，将url改为匹配的url即可
    'post',
    data => {
        let params = JSON.parse(data.body)
        console.log("mock data:", params)
        if (params.loginPwd === "111111") {
            return loginSuccessResp
        } else {
            return loginFailResp
        }

    }
)