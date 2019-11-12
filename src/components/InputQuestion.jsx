import React, { Component } from 'react';
import { withRouter } from 'react-router';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {db} from '../firebase/index';


class InputQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      a_q: "",
      b_q: "",
      c_q: "",
      d_q: "",
      password: "",
      a_q_num: 0,
      b_q_num: 0,
      c_q_num: 0,
      d_q_num: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleToInputQuestion = this.handleToInputQuestion.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.value
    });
  };

  handleToInputQuestion(e) {
    db.collection("question").add({
      title: this.state.title,
      a_q: this.state.a_q,
      b_q: this.state.b_q,
      c_q: this.state.c_q,
      d_q: this.state.d_q,
      password: this.state.password,
      a_q_num: 0,
      b_q_num: 0,
      c_q_num: 0,
      d_q_num: 0
    })
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <TextField
          id="standard-search"
          label="タイトル"
          name="title"
          type="search"
          autoComplete='off'
          onChange={this.handleChange}
          style={{ marginTop: 30, width: 450 }}
        /><br />
        <TextField
          id="standard-search"
          label="A"
          type="search"
          name="a_q"
          onChange={this.handleChange}
          autoComplete='off'
          style={{ marginTop: 30, width: 250 }}
        /><br />
        <TextField
          id="standard-search"
          label="B"
          type="search"
          name="b_q"
          onChange={this.handleChange}
          autoComplete='off'
          style={{ marginTop: 30, width: 250 }}
        /><br />
        <TextField
          id="standard-search"
          label="C"
          type="search"
          name="c_q"
          onChange={this.handleChange}
          autoComplete='off'
          style={{ marginTop: 30, width: 250 }}
        /><br />
        <TextField
          id="standard-search"
          label="D"
          type="search"
          name="d_q"
          onChange={this.handleChange}
          autoComplete='off'
          style={{ marginTop: 30, width: 250 }}
        /><br />
        <TextField
          id="standard-password-input"
          label="パスワード(結果確認に必要です)"
          type="password"
          name="password"
          onChange={this.handleChange}
          autoComplete="current-password"
          style={{ marginTop: 50, width: 250 }}
        /><br />

        <Button variant="contained" color="primary"　style={{ marginTop: 30, width: 400 }}
          onClick={this.handleToInputQuestion} >
          アンケートを投稿する
        </Button>

      </div>
    )
  }
}

export default withRouter(InputQuestion);
