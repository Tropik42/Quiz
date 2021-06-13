import React from 'react';
import './FinishedQuiz.css'

const FinishedQuiz = () => {
    return (
        <div className="FinishedQuiz">
            <ul>
                <li>
                    <strong>1. </strong>
                    How are you
                    <i className={'fa fa-times error'}/>
                </li>
                <li>
                    <strong>2. </strong>
                    How are you
                    <i className={'fa fa-check success'}/>
                </li>
            </ul>

            <p>Верно 4 из 10</p>

            <div>
                <button>Повторить</button>
            </div>
        </div>
    );
};

export default FinishedQuiz;