import React, { useState, setState } from 'react';
import Try from './Try_hooks';

function getNumber() {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const rand_nums = [];
    for (let i = 0; i < 4; i++) {
        rand_nums.push(nums.splice(Math.floor(Math.random() * (9 - i)), 1)[0]);
    }
    console.log(rand_nums);
    return rand_nums;
}

const NumberBaseBall = () => {
    const [maxCnt, setMaxCnt] = useState(10);
    const [useValue, setUserValue] = useState('');
    const [makeNums, setMakeNums] = useState(getNumber());
    const [inCnt, setinCnt] = useState(0);
    const [inputLog, setInputLog] = useState([]);
    console.log('change');
    const onChangeInput = (e) => {
        setUserValue(e.target.value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();

        let strike = 0;
        let ball = 0;

        if (useValue === '') {
            alert('값을 입력하세요');
            return false;
        }
        console.log(value + ' === ' + answer.join('') + ' === ' + answer);
        //4자리 다 맞을경우 stlike 처리
        if (useValue === makeNums.join('')) {
            setInputLog((prevState) => {
                return [...prevState, { try: useValue, result: `스트라이크 : ${strike} / 볼 : ${ball} ` }];
            });

            alert('홈런! 게임이 초기화 됩니다!');

            setUserValue('');
            setinCnt(0);
            setMakeNums(getNumber());
            setInputLog([]);
        } else {
            //입력받은 숫자 배열로 변환 split자르기
            const answerArray = useValue.split('').map((v) => parseInt(v));

            setinCnt(inputLog.length + 1);

            if (inputLog.length >= 9) {
                alert('게임회수 초과로 초기화 됩니다.');

                setUserValue('');
                setinCnt(0);
                setMakeNums(getNumber());
                setInputLog([]);
            } else {
                //만들어진 값안에  입력한 숫자가 들어있는지 확인
                for (let i = 0; i < 4; i++) {
                    if (answerArray[i] === makeNums[i]) {
                        strike += 1;
                    } else if (makeNums.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                //console.log(ball, strike, useValue);
                setInputLog((prevState) => {
                    return [...prevState, { try: useValue, result: `스트라이크 : ${strike} / 볼 : ${ball} ` }];
                });
                setUserValue('');
            }
        }
    };

    return (
        <div>
            <h1>
                최대 게임회수 {maxCnt} / 입력 회수 {inCnt}
            </h1>
            <form onSubmit={onSubmitForm}>
                <input type="text" name="inputnumber" value={useValue} onChange={onChangeInput} placeholder="값을 입력하세요" maxLength={4} />
            </form>
            <h1>결과</h1>

            <ul>
                {inputLog.map((val, index) => {
                    return <Try tyuinfo={val} idx={index} key={index} />;
                })}
            </ul>
        </div>
    );
};

export default NumberBaseBall;
