import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';
import { Bar } from 'react-chartjs-2';
import {db} from '../firebase/index';


class Question extends Component {
  constructor(props){
    super(props);
    this.state = {
      a_q_num: props.a_q_num,
      b_q_num: props.b_q_num,
      c_q_num: props.c_q_num,
      d_q_num: props.d_q_num,
      data: { datasets:[], labels:[] },
      options: {},
      disabled: false
    };
  }

  /*
    回答数を再度取得後に表示するグラフ結果のデータ生成を行う.
    データを更新する前にグラフを表示するのでstateで押したうnumに対して+1する.
    選択した棒は赤色に変更する.
  */
  makeGraphData = (type) => {
    let graphData = [];
    let graphColor = [];
    if(type === "A"){
      graphData = [
        this.state.a_q_num + 1,
        this.state.b_q_num,
        this.state.c_q_num,
        this.state.d_q_num
      ];
      graphColor = [
        "rgba(255, 99, 132, 0.4)", "rgba(75,192,192,0.4)",
        "rgba(75,192,192,0.4)", "rgba(75,192,192,0.4)"
      ]
    }else if(type === "B"){
      graphData = [
        this.state.a_q_num,
        this.state.b_q_num + 1,
        this.state.c_q_num,
        this.state.d_q_num
      ];
      graphColor = [
        "rgba(75,192,192,0.4)", "rgba(255, 99, 132, 0.4)",
        "rgba(75,192,192,0.4)", "rgba(75,192,192,0.4)"
      ]
    }else if(type === "C"){
      graphData = [
        this.state.a_q_num,
        this.state.b_q_num,
        this.state.c_q_num + 1,
        this.state.d_q_num
      ];
      graphColor = [
        "rgba(75,192,192,0.4)", "rgba(75,192,192,0.4)",
        "rgba(255, 99, 132, 0.4)", "rgba(75,192,192,0.4)"
      ]
    }else if(type === "D"){
      graphData = [
        this.state.a_q_num,
        this.state.b_q_num,
        this.state.c_q_num,
        this.state.d_q_num + 1
      ];
      graphColor = [
        "rgba(75,192,192,0.4)", "rgba(75,192,192,0.4)",
        "rgba(75,192,192,0.4)", "rgba(255, 99, 132, 0.4)"
      ]
    }else{
      graphData = [
        this.state.a_q_num,
        this.state.b_q_num,
        this.state.c_q_num,
        this.state.d_q_num
      ];
      graphColor = [
        "rgba(75,192,192,0.4)", "rgba(75,192,192,0.4)",
        "rgba(75,192,192,0.4)", "rgba(75,192,192,0.4)"
      ]
    }
    this.setState({
      data: {
          datasets: [{
              data: graphData,
              backgroundColor: graphColor,
          }],
          labels: [
            this.props.a_q,
            this.props.b_q,
            this.props.c_q,
            this.props.d_q
          ]
      },
      options: {
        scaleOverride: true,
        responsive: false,
        maintainAspectRatio: false,
        scaleSteps: 1,

        title: {
          display: true,
          text: '結果',
          fontSize: 20
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
              ticks: {
                beginAtZero: true,
                min: 0,
                fontSize: 18
              },
          }],
          xAxes: [{
            display: true,
            barPercentage: 0.4,
            categoryPercentage: 0.4,
            barThickness: 100,
            minBarLength: 2,
            ticks: {
              fontSize: 30
            },
          }]
        },
        layout: {
          padding: {
            bottom: 60
          }
        }
      }
    });
  }

  // 検索-回答後, 画面遷移するとグラフが表示されたままになるので
  // dataを空にする
  componentWillReceiveProps = () => {
    this.setState({
      data: { datasets:[], labels:[] },
      disabled: false
    })
  }

  // 各アンケートボタンを押したときの処理
  clickButtonA = () => {
    db.collection('question').doc(this.props.id).update({
      a_q_num: this.props.a_q_num + 1
    });
    this.setState({ disabled: true });
    this.makeGraphData("A");
  }

  clickButtonB = () => {
    db.collection('question').doc(this.props.id).update({
      b_q_num: this.props.b_q_num + 1
    });
    this.setState({ disabled: true });
    this.makeGraphData("B");
  }

  clickButtonC = () => {
    db.collection('question').doc(this.props.id).update({
      c_q_num: this.props.c_q_num + 1
    });
    this.setState({ disabled: true });
    this.makeGraphData("C");
  }

  clickButtonD = () => {
    db.collection('question').doc(this.props.id).update({
      d_q_num: this.props.d_q_num + 1
    });
    this.setState({ disabled: true });
    this.makeGraphData("D");
  }

  // パスワードを入力してアンケート結果を見る
  clickKekka = () => {
    const inputPassword = prompt("結果確認パスワードを入力してください。");
    if(inputPassword === this.props.password){
      this.setState({ disabled: true });
      this.makeGraphData("");
    }else if(inputPassword !== this.props.password && inputPassword !== null){
      window.alert("パスワードが違います");
    }
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: lightBlue,
        secondary: {
          main: '#84ffff',
        },
      },
    });

    return (
      <div>
        <div id="title">{this.props.title}</div>
        <div id="question_box">
          <ThemeProvider theme={theme}>
            <Button variant="contained" color="primary" style={{ marginRight: 10 }}
              onClick={this.clickButtonA} disabled={this.state.disabled} >
              <div id="question_text_color">{this.props.a_q}</div>
            </Button>
            <Button variant="contained" color="primary" style={{ marginRight: 10 }}
              onClick={this.clickButtonB} disabled={this.state.disabled} >
              <div id="question_text_color">{this.props.b_q}</div>
            </Button>
            <Button variant="contained" color="primary" style={{ marginRight: 10 }}
             onClick={this.clickButtonC} disabled={this.state.disabled} >
              <div id="question_text_color">{this.props.c_q}</div>
            </Button>
            <Button variant="contained" color="primary" style={{ marginRight: 10 }}
              onClick={this.clickButtonD} disabled={this.state.disabled} >
              <div id="question_text_color">{this.props.d_q}</div>
            </Button>
          </ThemeProvider>
            <img src='../eye.png' alt='' onClick={this.clickKekka}
              style={{width: 50, height: 45}} />
        </div>
        <div>
          { this.state.data.datasets.length !== 0 && (
            <div>
              <Bar
                data={this.state.data}
                width={550}
                height={400}
                options={this.state.options}
                id="chart_box"
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(Question);
