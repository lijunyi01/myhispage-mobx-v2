const environmentVariables = {
    development: {
        BASE_URL: "/",
        IS_NEED_AUTH: false,
    },
    production: {
        BASE_URL: "/",
        IS_NEED_AUTH: true,
    }
}

const stage = process.env.REACT_APP_STAGE || process.env.NODE_ENV || "development";
const config = environmentVariables[stage];

const conf = {
    ENV_A: '',
    ENV_B: '',
    ...config
};

// export default {
//     ENV_A: '',
//     ENV_B: '',
//     ...config
// };

export default conf;