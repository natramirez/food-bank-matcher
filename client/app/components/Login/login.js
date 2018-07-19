import React, { Component } from 'react';
import style from 'styled-components';


const CenterPage = style.div`
    text-align: center;
`

class Login extends Component {
    render(){
		return(
			<CenterPage>
				<div>
					<p>Login</p>
					<form action="/api/registeredUsers" method="post">
						<input type="text" name="logemail" placeholder="E-mail" required=""/>
						<br/>
						<br/>
						<input type="password" name="logpassword" placeholder="Password" required=""/>
						<br/>
						<br/>
						<input type="submit" value="LOGIN"/>
					</form>
				</div>
			</CenterPage>
		);
	}
}
export default Login;
