import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { fade,withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router';


const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);


class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  handleToInputQuestion = () => {
    this.props.history.push('/InputQuestion');
  }

  render() {
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
            <Typography variant="h6" color="inherit"
              style={{ textDecoration: 'none', flexGrow: 1, marginLeft: 380 }}
              component={Link} to="/">
              アンケートApp
            </Typography>
            <form>
              <BootstrapInput id="bootstrap-input" name="word" autoComplete="off"
                placeholder="アンケートを検索" style={{ marginRight: 30 }}/>
            </form>
            <div>
              <Button color='inherit' variant='outlined' style={{ marginRight: 10 }} onClick={this.handleToInputQuestion}>
                アンケート作成
              </Button>
            </div>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withRouter(Nav);
