import React from 'react';
import { Answer } from './index';


const AnswersList = (props) => {
  return(
    <div className='c-grid__answer'>
      {/* 引数を２つ渡す　valueはcontentの値、indexは0から始まる数字をそれぞれに与える */}
      { props.answers.map((value, index) => {
        return < Answer 
          content={value.content}
          nextId={value.nextId}
          key={index.toString()}
          // コールバック関数をanswerに渡している
          select={ props.select }
        />
      })}

    </div>
  )
}


export default AnswersList;