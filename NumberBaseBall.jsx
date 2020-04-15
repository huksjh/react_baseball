import React, { Component } from 'react';
import Try from './Try';

function getNumber() {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const rand_nums = [];
    for (let i = 0; i < 4; i++) {
        rand_nums.push(nums.splice(Math.floor(Math.random() * (9 - i)), 1)[0]);
    }
    console.log(rand_nums);
    return rand_nums;
}

class NumberBaseBall extends Component {
    state = {
        maxCnt: 10,
        user_value: '',
        make_nums: getNumber(),
        in_Cnt: 0,
        input_log: [], //결좌쪽에 보여줄 값 만들어 넣기  [{ key:value, key:value}]
    };

    onChangeInput = (e) => {
        this.setState({
            user_value: e.target.value,
        });
    };
    onSubmitForm = (e) => {
        const { maxCnt, user_value, make_nums, in_Cnt, input_log } = this.state;

        e.preventDefault();

        let strike = 0;
        let ball = 0;

        if (user_value === '') {
            alert('값을 입력하세요');
            return false;
        }

        //4자리 다 맞을경우 stlike 처리
        if (user_value === make_nums.join('')) {
            alert('홈런! 게임이 초기화 됩니다!');
            this.setState({
                user_value: '',
                in_Cnt: 0,
                make_nums: getNumber(),
                input_log: [],
            });
        } else {
            //입력받은 숫자 배열로 변환 split자르기
            const answerArray = user_value.split('').map((v) => parseInt(v));

            this.setState({
                in_Cnt: input_log.length + 1,
            });

            if (input_log.length >= 9) {
                alert('게임회수 초과로 초기화 됩니다.');
                this.setState({
                    user_value: '',
                    in_Cnt: 0,
                    make_nums: getNumber(),
                    input_log: [],
                });
            } else {
                //만들어진 값안에  입력한 숫자가 들어있는지 확인
                for (let i = 0; i < 4; i++) {
                    if (answerArray[i] === make_nums[i]) {
                        strike += 1;
                    } else if (make_nums.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                //console.log(ball, strike, user_value);

                this.setState((prevState) => {
                    return {
                        input_log: [...prevState.input_log, { try: user_value, result: `스트라이크 : ${strike} / 볼 : ${ball} ` }],
                        user_value: '',
                    };
                });
            }
        }
    };
    render() {
        const { maxCnt, user_value, make_nums, in_Cnt, input_log } = this.state;
        return (
            <div>
                <h1>
                    최대 게임회수 {maxCnt} / 입력 회수 {in_Cnt}
                </h1>
                <form onSubmit={this.onSubmitForm}>
                    <input type="text" value={user_value} onChange={this.onChangeInput} placeholder="값을 입력하세요" maxLength={4} />
                </form>
                <h1>결과</h1>

                <ul>
                    {input_log.map((val, index) => {
                        return <Try tyuinfo={val} idx={index} key={index} />;
                    })}
                </ul>
            </div>
        );
    }
}

export default NumberBaseBall;
