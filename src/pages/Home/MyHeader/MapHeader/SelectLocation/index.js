import React from 'react';
// import React, { useState, useEffect } from 'react';
// import { observer, inject } from 'mobx-react';
// import { Modal } from 'antd';
import { Drawer } from 'antd';
import LocationTree from './LocationTree';
// import { getTreeData } from '@/axios/api';
import './index.less';

function Index(props) {

    // const [treeData, setTreeData] = useState([]);

    // useEffect(() => {
    //     // async function getMyTreeData(){
    //     //     console.log("in nav2 modals selectlocation showFlag:",props.showFlag)
    //     //     // console.log("in nav2 modals selectlocation treeData:",treeData)
    //     //     if(props.showFlag) {
    //     //         try{
    //     //             const result = await getTreeData({});
    //     //             // console.log("get tree Data:",result);
    //     //             setTreeData(result.locationBeanList);
    //     //         }catch(err){
    //     //             console.log("get treeData error:",err);
    //     //         }
    //     //     }
    //     // }
    //     // getMyTreeData();
    // }, [props.showFlag]);

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
        </Drawer>

    )
}

export default Index;
