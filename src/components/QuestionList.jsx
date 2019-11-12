import React, { Component } from 'react';
import Question from './Question';

class QuestionList extends Component {
  render() {
    const questions = [];
    for(let i = 0; i < this.props.questions.length; i++){
      questions.push(
        <Question
          key={i}
          index={i}
          id={this.props.id[i]}
          title={this.props.questions[i].title}
          a_q={this.props.questions[i].a_q}
          b_q={this.props.questions[i].b_q}
          c_q={this.props.questions[i].c_q}
          d_q={this.props.questions[i].d_q}
          a_q_num={this.props.questions[i].a_q_num}
          b_q_num={this.props.questions[i].b_q_num}
          c_q_num={this.props.questions[i].c_q_num}
          d_q_num={this.props.questions[i].d_q_num}
          password={this.props.questions[i].password}
        />
      );
    }

    return (
      <ul>
        {questions}
      </ul>
    );
  }
}

export default QuestionList;
