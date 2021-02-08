import React from 'react';
import './index.less';

function Index(props) {
    let { cardParam, leftPos, topPos } = props;
    return (
        <div className="projItemCard" style={{ top: topPos, left: leftPos }}>
            Card
        </div>
    )
}

export default Index;