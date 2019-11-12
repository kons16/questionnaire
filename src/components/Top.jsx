import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {db} from '../firebase/index';

import QuestionList from './QuestionList';


class Top extends Component {
  constructor(){
    super();
    this.state = {
      questions: [],
      id: []
    };
  }

  // firestoreから全データを取得する
  getAllData = () => {
    const questions = [];
    const id = [];
    // firestoreからquestionデータの取得
    db.collection('question').get().then((res) => {
      res.forEach((doc) => {
        questions.push(doc.data());
        id.push(doc.id);
      });
      this.setState({
        questions: questions,
        id: id
      });
    });
  }

  componentWillReceiveProps = () => {
    this.getAllData();
  }

  componentDidMount = () => {
    const urlParamStr = window.location.search;
    const searchWord = decodeURI(urlParamStr.substring(1)).split("=")[1];
    const questions = [];
    const id = [];
    if(searchWord){
      // firestoreからwordをもとに検索を行う
      const ref = db.collection('question');
      ref.orderBy('title').startAt(searchWord).endAt(searchWord+'\uf8ff')
        .get().then((res) => {
          res.forEach((doc) => {
            questions.push(doc.data());
            id.push(doc.id);
          });
          this.setState({
            questions: questions,
            id: id
          });
      });
    } else {
      this.getAllData();
    }
  }

  render() {
    return (
      <div className="App">
        <QuestionList
          questions={this.state.questions}
          id={this.state.id}
        />
      </div>
    );
  }
}

export default withRouter(Top);
