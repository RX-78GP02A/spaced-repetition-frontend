import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Label } from '../Form/Form';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/UserContext';
import Button from '../Button/Button';
import './LoginForm.css';

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => { }
  }

  static contextType = UserContext

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { username, password } = ev.target

    this.setState({ error: null })

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = ''
        password.value = ''
        this.context.processLogin(res.authToken)
        this.props.onLoginSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  handleError = (ev) => {
    ev.preventDefault();
    this.setState({
      error:null
    })
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='LoginForm'
        id='login-form'
        onSubmit={this.handleSubmit}
      >
        <div role='alert' className="Error">
          {error && <p>{error}</p>}
        </div>
        <div className='username-container'>
          <Label htmlFor='login-username-input'>
            Username<br/>
            Demo: 'demo'
          </Label>
          <Input
            ref={this.firstInput}
            id='login-username-input'
            name='username'
            required
          />
        </div>
        <div className='password-container'>
          <Label htmlFor='login-password-input'>
            Password<br/>
            Demo: 'Demo1234!'
          </Label>
          <Input
            id='login-password-input'
            name='password'
            type='password'
            required
          />
        </div>
        <Button type='submit' id="login-button" className="submit stylish-btn">
          Login
        </Button>
        <Link className="already-signed-up" to='/register'>Sign up</Link>
      </form>
    )
  }
};

export default LoginForm;
