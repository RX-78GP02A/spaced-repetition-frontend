import React, { Component } from 'react';
import Loading from '../Loading/Loading';
import { FrontSide } from 'react-flippy';
import './GuessCard.css';

export class GuessCard extends Component {
  render() {
    const { word, loading, correct, incorrect, inputValue, handleSubmitAnswer } = this.props
    return (
      <FrontSide>
        <div className="Word-Container">
          <h2>{word}</h2>
          {!word && <Loading loading={loading}/>}
          <p className="Correct-Count">{`Correct guesses: ${correct}`}</p>
          <p className="Incorrect-Count">{`Incorrect guesses: ${incorrect}`}</p>
          <form id="User-Guess" onSubmit={handleSubmitAnswer}>
              <label>
                  Your Guess:{' '}
                  <input type="text" ref={inputValue}/>
              </label>
              <button type="submit" className="Submit-Btn stylish-btn">Submit</button>
          </form>
        </div> 
      </FrontSide>
    )
  }
};

export default GuessCard;
