import React from 'react';

function index(props) {
    // console.log(props);
    return (
        <div>
            MainContent<br />
            {props.mainContentDivHeight}<br />
            {props.mainContentDivWidth}
        </div>
    )
}

export default index;
