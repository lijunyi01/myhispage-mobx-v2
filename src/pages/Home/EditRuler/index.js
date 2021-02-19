import React from 'react';
import RulerList from './RulerList';
import RulerContent from './RulerContent/index2';
import './index.less';


function index() {
    return (
        <div className="rulerwrap">
            <div className="list">
                <RulerList />
            </div>
            <div className="content">
                <RulerContent />
            </div>
        </div>
    )
}

export default index
