import homeState from '@pages/Home/index.state';
import loginState from '@pages/Login/index.state';

const rootState = { 
    ...homeState,
    ...loginState
};

export default rootState;