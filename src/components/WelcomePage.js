import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import image from '../images/food_cropped.jpg'

class WelcomePage extends Component {
  render() {
    return (
        <div className="page-content">
            <div className="home-image">
                <img src={image} className="img-fluid" alt="Responsive image" />
                <div className="overlay-text">
                    <h2>we help food banks<br/>distribute their<br/>surplus supplies</h2>
                    <button type="button" class="btn btn-primary">Learn More</button>
                </div>
            </div>
        </div>
        
    );
  }
}
{/* <h1 className="page-title">Bienvenidos a Mujer al Volante.</h1>
            <p className="welcome-lead">En esta página web, usted podra encontrar examenes que le van a ayudar a prepararse <br/>
                para el examen escrito para sacar el permiso de manejo en el estado de Washington.</p>
            <Link to={'/examen_completo/en_proceso'}>COMENZAR A PRACTICAR</Link> */}
export default WelcomePage;
