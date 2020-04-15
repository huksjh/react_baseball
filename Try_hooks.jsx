import React from 'react';

const Try = ({ idx, tyuinfo }) => {
    return (
        <li key={idx + `번째입력`}>
            <div>{tyuinfo.try}</div>
            <div>{tyuinfo.result}</div>
        </li>
    );
};

export default Try;
