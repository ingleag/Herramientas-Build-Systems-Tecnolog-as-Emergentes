import React, { Component } from 'react';
import './login.css';

class Login extends Component {
  state = {
    usuario: this.props.usuario,
    contrasena: this.props.contrasena,
    id:this.props.id,
  };

  handleSubmit = async e => {
    e.preventDefault();
    var data = {usuario: this.state.usuario, contrasena: this.state.contrasena};
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const body = await response.text();
    
    if (JSON.parse(body).length > 0){
        if (JSON.parse(body)[0].msg === "OK"){
            alert('Bienvenido');
            this.setState({ id: JSON.parse(body)[0].id });
            localStorage.setItem('isLoggedIn', "true");
            localStorage.setItem('isLoggedId', JSON.parse(body)[0].id);
            window.location.href = '/productos';
            //document.form.submit();
        }else{
            localStorage.setItem('isLoggedIn', "false");
            alert(body[0].msg);
        }
    }else{
        alert('Se presento error al comunicarse con el servidor');
    }
  };

  render()
  {
      
    return (
        <div className="Login">
          <div className="main">
              <div className="login-container">
                  <h4>Inicia sesión</h4>
                  <form onSubmit={this.handleSubmit}>
                      <div className="row align-center">
                          <div className="col s12">
                              <label htmlFor="usuario">Dirección correo electrónico
                                  <input type="email" name="usuario" value={this.state.usuario} onChange={e => this.setState({ usuario: e.target.value })} required pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?" />
                              </label>
                          </div>
                      </div>
                      <div className="row align-center">
                          <div className="col s12">
                              <label htmlFor="contrasena">Contraseña
                                  <input type="password" value={this.state.contrasena} onChange={e => this.setState({ contrasena: e.target.value })} name="contrasena" required />
                              </label>
                          </div>
                      </div>
                      <div className="row align-center">
                          <div className="col s12 error-container"></div>
                      </div>
                      <div className="row align-center">
                          <div className="col s12 btn-container">
                              <button className="waves-effect waves-light btn" type="submit" value="Submit">Ingresar</button>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>

    );
  }
}

export default Login;
