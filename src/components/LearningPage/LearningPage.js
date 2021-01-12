import React from 'react';
import './LearningPage.css';
import Flippy from 'react-flippy';
import LearningPageService from '../../services/learningpage-service'
import GuessCard from '../GuessCard/GuessCard'
import AnswerCard from '../AnswerCard/AnswerCard'

class LearningPage extends React.Component{
    constructor(){
        super()
        this.state = {
            isFlipped:false,
            word:'',
            results: {},
            loading: true,
            answering: true,
            correct: 0,
        }
        this.userInput = React.createRef()
        this.handleNextQuestion = this.handleNextQuestion.bind(this)
        this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this)
    }

    async componentDidMount() {
        const word = await LearningPageService.fetchWordHead()
        this.setState({ 
            word: word.nextWord, 
            loading: false, 
            correct: word.wordCorrectCount, 
            incorrect: word.wordIncorrectCount 
        })
    }
    
    handleNextQuestion = (ev) => {
        ev.preventDefault()
        this.setState({
            isFlipped:!this.state.isFlipped,
            word: this.state.newWord,
            answering: true,
            loading: false
        })
    }

    handleSubmitAnswer = async(ev) => {
        ev.preventDefault()
        const { answering } = this.state
        if (answering) {
            const guess = this.userInput.current.value
            const results = await LearningPageService.submitAnswer({
                guess
            })
            this.setState({ 
                results: results, 
                isFlipped:!this.state.isFlipped, 
                loading: false,
                answering: false,
                correct: results.wordCorrectCount,
                incorrect: results.wordIncorrectCount,
                newWord: results.nextWord
            })
            this.userInput.current.value = ''
        }
    }

    render(){
        const { word, correct, incorrect, loading, results } = this.state
        return (
            <div className="Card-Container">
                <Flippy
                flipDirection="horizontal"
                flipOnClick={false}
                isFlipped={this.state.isFlipped}
                className="flippy-card-container"
                >
                    <GuessCard
                        word={word}
                        correct={correct}
                        incorrect={incorrect}
                        loading={loading}
                        inputValue={this.userInput}
                        handleSubmitAnswer={this.handleSubmitAnswer}
                    />
                    <AnswerCard
                        word={word}
                        loading={loading}
                        results={results}
                        handleNextQuestion={this.handleNextQuestion}
                    />
                </Flippy>
           </div>
        )
    }

}
export default LearningPage