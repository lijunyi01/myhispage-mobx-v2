import React from 'react';
// import React, { useState, useEffect } from 'react';
// import { observer, inject } from 'mobx-react';
// import { Modal } from 'antd';
import { Drawer } from 'antd';
import LocationTree from './LocationTree';
// import { getTreeData } from '@/axios/api';
import './index.less';
import AddSubLocationModal from './AddSubLocationModal';

function Index(props) {

    return (

        <Drawer
            title="Select Location"
            placement="left"
            closable={false}
            onClose={props.onClose}
            visible={props.showFlag}
            key="left"
            bodyStyle={{ background: "#f0f2f5" }}
            headerStyle={{ background: "#329b26" }}
        >
            <LocationTree />
            <AddSubLocationModal />
        </Drawer>

    )
}

export default Index;
