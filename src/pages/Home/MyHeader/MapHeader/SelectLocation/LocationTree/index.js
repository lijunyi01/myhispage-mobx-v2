import React, { useState, useEffect } from 'react';
import { Tree, Input, Card, Modal } from 'antd';
import { EditOutlined, ExclamationCircleOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
// import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import mapState from '@pages/Home/HisMap/index.state';
import _ from 'lodash';
import AddSubLocationModal from '../AddSubLocationModal';

// const { TreeNode } = Tree;

function Index() {
  // 同时创建了 expandedKeys 和 setExpandedKeys 两个变量，expandedKeys 的值为 useState 返回的第一个值，setExpandedKeys 是返回的第二个值（更新expandedKeys的函数）
  // 为组件申明了一个state变量：expandedKeys ，函数退出后该state变量及其值会被react保留
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  // 右键弹出的菜单的数据
  const [locationEditMenuData, setLocationEditMenuData] = useState(null);
  // 控制modal的数据
  const [showAddSubModal, setShowAddSubModal] = useState(false);

  // 搜索组件
  const { Search } = Input;

  // 从树形json数据中构造出的一维数组（没有了层级关系），形如[{key:1,title:'中国地名'},{key:2,title:'常州'}]
  let [dataList, setDataList] = useState([]);

  useEffect(() => {
    if (!mapState.showLocationSelectDwawerFlag) {
      // 抽屉收起时去掉选中和弹出的操作界面
      setLocationEditMenuData(null);
      setSelectedKeys([]);
    }
  }, [mapState.showLocationSelectDwawerFlag]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // if (toJS(mapState.locationTreeData).length !== 0 && dataList.length === 0) {
    //   generateList(mapState.locationTreeData);
    //   console.log("generateList:", dataList)
    // }
    return function cleanup() {
      // drawer 收起来时不会清理；切换路由才清理
      setDataList([]);
      setLocationEditMenuData(null);
      setSelectedKeys([]);
    }
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (toJS(mapState.locationTreeData).length !== 0 && dataList.length === 0) {
      generateList(mapState.locationTreeData);
    }
    console.log("generateList:", dataList)
  }, [mapState.locationTreeData]);  // eslint-disable-line react-hooks/exhaustive-deps

  const onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.

    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
    clearLocationEditMenu();
    setSelectedKeys([]);

  };

  const onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    setCheckedKeys(checkedKeys);
    mapState.getMarkerListMethod(checkedKeys);
  };

  const onSelect = (selectedKeys, info) => {
    // console.log('onSelect info:', info);
    // console.log("clientWidth:", info.nativeEvent.target.clientWidth);
    // console.log("selectedKeys:", selectedKeys);
    setSelectedKeys(selectedKeys);

    if (selectedKeys.length > 0) {
      // var x = info.nativeEvent.target.offsetLeft + info.nativeEvent.target.clientWidth;
      // var y = info.nativeEvent.target.offsetTop - 2;
      let x = info.nativeEvent.pageX;
      let y = info.nativeEvent.pageY;
      console.log('y:' + y);
      // 1 目录，  2 叶级地址
      var nodeType = 2;
      if (info.node.children) {
        nodeType = 1;
      }
      setLocationEditMenuData({
        pageX: x,
        pageY: y,
        id: selectedKeys[0],
        name: "",
        nodeType: nodeType
        // category: node.props.dataRef.category
      });
    } else {
      setLocationEditMenuData(null);
    }
  };

  const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some(item => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

  const generateList = data => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { key } = node;
      dataList.push({ key, title: node.title });
      // dataList.push({ key, title: key });
      if (node.children) {
        generateList(node.children);
      }
    }
  };

  // 搜索筐内容变更处理函数
  const onSearchChange = _.debounce(e => {
    const { value } = e.target;
    let shouldExpandedKeys;
    if (value !== "") {
      shouldExpandedKeys = dataList
        .map(item => {
          if (item.title.indexOf(value) > -1) {
            return getParentKey(item.key, mapState.locationTreeData);
          }
          return null;
        })
        .filter((item, i, self) => item && self.indexOf(item) === i);
    }
    // console.log("shouldExpandedKeys:", shouldExpandedKeys)
    setExpandedKeys(shouldExpandedKeys);
    setSearchValue(value);
    // console.log(searchValue);
    setAutoExpandParent(true);
  }, 300)

  const loop = data =>
    data.map(item => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
            <span>{item.title}</span>
          );
      if (item.children) {
        return { title, key: item.key, children: loop(item.children) };
      }

      return {
        title,
        key: item.key,
      };
    });

  const getLocationEditMenu = () => {
    const { pageX, pageY, nodeType } = locationEditMenuData;
    const tmpStyle = {
      position: 'absolute',
      left: `${pageX + 50}px`,
      top: `${pageY - 10}px`,
      zIndex: '10',
    };
    const menuForDir = (
      <div
        style={tmpStyle}
      >
        <Card
          style={{ width: 200 }}
          bodyStyle={{ backgroundColor: 'black', padding: 5 }}
          hoverable={true}
          actions={[
            <PlusOutlined key="add" onClick={() => { setShowAddSubModal(true) }} />,
            <EditOutlined key="edit" />,
            <DeleteOutlined key="del" onClick={() => {
              Modal.confirm({
                title: '确认删除吗?',
                icon: <ExclamationCircleOutlined />,
                content: '',
                okText: '是',
                okType: 'danger',
                cancelText: '否',
                onOk: () => {
                  mapState.deleteLocationMethod({ 'selectedKey': selectedKeys[0], 'locationType': 1 }, () => { onSelect([], null) });
                }
                ,
                onCancel() {
                  // console.log('Cancel');
                },
              });
            }} />,
          ]}
        >
        </Card>
      </div>
    );
    const menuForLocation = (
      <div
        style={tmpStyle}
      >
        <Card
          style={{ width: 150 }}
          bodyStyle={{ backgroundColor: 'black', padding: 5 }}
          hoverable={true}
          actions={[
            <EditOutlined key="edit" />,
            <DeleteOutlined key="del" onClick={() => {
              Modal.confirm({
                title: '确认删除吗?',
                icon: <ExclamationCircleOutlined />,
                content: '',
                okText: '是',
                okType: 'danger',
                cancelText: '否',
                onOk: () => {
                  mapState.deleteLocationMethod({ 'selectedKey': selectedKeys[0], 'locationType': 0 }, () => { onSelect([], null) });
                }
                ,
                onCancel() {
                  // console.log('Cancel');
                },
              });
            }} />,
          ]}
        >
        </Card>
      </div>
    );
    const whichMenu = () => {
      if (locationEditMenuData === null) {
        return '';
      } else if (nodeType === 1) {
        return menuForDir;
      } else {
        return menuForLocation;
      }
    }
    // return (locationEditMenuData == null) ? '' : (nodeType == 1 ? menu1 : menu2);
    return whichMenu();
  }

  const clearLocationEditMenu = () => {
    setLocationEditMenuData(null)
  }

  // const handleAddSub = () => {
  //   // 写自己的业务逻辑
  //   setShowAddSubModal(true);
  //   // clearLocationEditMenu();
  //   // setSelectedKeys([]);
  // }

  // const handleEditSub = () => {
  //   // 写自己的业务逻辑
  // }

  // const handleDeleteSub = () => {
  //   // 写自己的业务逻辑
  // }

  // const onAddSubModalClose = () => {
  //   setShowAddSubModal(false);
  // }

  // const onAddSubModalSubmit = values => {
  //   let param = { ...values, selectedKey: selectedKeys[0] }
  //   console.log("on submit:", param);
  //   setShowAddSubModal(false);
  // }

  return (
    // <div style={{ position: 'relative' }}>
    <div>
      <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={onSearchChange} allowClear />
      <Tree
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={loop(toJS(mapState.locationTreeData))}
        height={500}
      />
      {locationEditMenuData != null ? getLocationEditMenu() : ""}
      <AddSubLocationModal
        locationId={selectedKeys.length > 0 ? selectedKeys[0] : -1}
        showFlag={showAddSubModal}
        onClose={() => { setShowAddSubModal(false) }}
        onSubmit={param => { mapState.addLocationMethod(param, () => { setShowAddSubModal(false); onSelect([], null) }) }}
      />
    </div>
  )
}

export default observer(Index);
