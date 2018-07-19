import React, { Component } from 'react';
import style from 'styled-components';


const CenterPage = style.div`
    text-align: center;
`


class SignUp extends Component {
	





	render() {
		return (
			<CenterPage>
			<div>
			<p>Register</p>

			<form action="/api/registeredUsers" method="post">

            <input type="text" name="first_name" placeholder="First Name" required=""/>
             <br/>
             <br/>
            <input type="text" name="last_name" placeholder="Last Name" required=""/>
             <br/>
             <br/>
            <input type="text" name="email" placeholder="E-mail" required=""/>
             <br/>
             <br/>
			<input type="text" name="username" placeholder="Username" required=""/>
			 <br/>
             <br/>
			<input type="password" name="password" placeholder="Password" required=""/>
			 <br/>
             <br/>
			<input type="text" name="city" placeholder="City" required=""/>
			 <br/>
             <br/>
			<input type="text" name="state" placeholder="State" required=""/>
			 <br/>
             <br/>
			<input type="text" name="zip" placeholder="Zip" required=""/>
			 <br/>
             <br/>
			<input type="submit" value="REGISTER"/>
        </form>
        </div>
        </CenterPage>
	                
		);
	}
}

export default SignUp;
