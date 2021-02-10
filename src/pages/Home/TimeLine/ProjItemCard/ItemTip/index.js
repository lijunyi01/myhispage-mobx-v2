import React from 'react';
import './index.less';


function index(props) {
    return (
        <div className="itemTip">
            <div className="itemTipLeft">T :</div>
            <div className="itemTipRight">{props.tipContent}</div>
        </div>
    )
}

export default index
