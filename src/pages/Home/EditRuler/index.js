import React from 'react';
import RulerList from './rulerList';
import RulerContent from './rulerContent';
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
