import React, { Component } from 'react';
import './Quiz.css'
import ActiveQuiz from '../../Components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../Components/FinishedQuiz/FinishedQuiz';

class Quiz extends Component {
    state = {
        results: {}, //{[id]: 'success' 'error'}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // { [id]: 'success' 'error' }
        quiz: [
            {
                question: 'Сколько колонн на фасаде Большого Театра?',
                rightAnswerId: 1,
                id: 1,
                answers: [
                    {text: '8', id: 1},
                    {text: '6', id: 2},
                    {text: '7', id: 3},
                    {text: '10', id: 4},
                ]
            },
            {
                question: 'Какая улица самая длинная в Москве?',
                rightAnswerId: 3,
                id: 2,
                answers: [
                    {text: 'Профсоюзная', id: 1},
                    {text: 'Варшавское шоссе', id: 2},
                    {text: 'МКАД', id: 3},
                    {text: 'Ленинградский проспект', id: 4},
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            console.log(Object.keys(this.state.answerState));
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion+1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout)
            }, 1000)

           
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }        
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    render() {
        return (
            <div className="Quiz">             
                <div className="QuizWrapper">
                    <h1>Ответьте на вопросы</h1>

                    {
                        this.state.isFinished
                        ?   <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                            />
                        :   <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }

                    
                </div>
            </div>
        );
    }
}

export default Quiz;