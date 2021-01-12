import React from 'react';
import './DashCard.css';

export default function DashCard(props){
    return props.words.map(word =>{
        return (
            <div className="DashCard" key={word.original}>
                <h4 className="Word">{word.original}</h4>
                <span>
                    correct answer count: {word.correct_count}
                </span>
                <br/>
                <span>
                    incorrect answer count: {word.incorrect_count}
                </span>
            </div>
        )
    })
}