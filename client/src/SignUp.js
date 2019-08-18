import React from 'react';
import './DottedBox.css';

class SignUp extends React.Component {

    componentDidMount() {
        const login = document.getElementById('login');
        const signup = document.getElementById('signup');

        const showText = {
        login : {
            header : 'Not yet a member?',
            byline : 'Sign up and discover what we can do for you',
            buttonText: 'Sign up'
        },
        
        signup : {
            header : 'Already a member?',
            byline : 'Sign in and see what\'s new since your last visit',
            buttonText: 'Sign in'    
        }
        }
        const switchButton = document.getElementById('switch-button');
        const switchText =  document.getElementById('switch-text');

        switchButton.addEventListener('click', () => {
        login.classList.toggle('hide-view');
        signup.classList.toggle('hide-view');
        login.classList.contains('hide-view') ? changeSwitchText('signup') : changeSwitchText('login')
        })

        function changeSwitchText(el){
        switchText.children[0].innerText = showText[el].header;
        switchText.children[1].innerText = showText[el].byline;
        switchButton.innerText = showText[el].buttonText;
        }
    }

    render () {
        return (
            <div className="main-page">
            <div className="smooth login" id="login">
            <h1 className="login__header header">Welcome back to the party club</h1>
            <p className="login__byline">It's good to see you again, come in using your favourite social network</p>
            <div className="social-media__container">
            <span className="fa-stack fa-lg social-media__icon icon">
            <i className="fas fa-circle fa-stack-2x" style={{color: '#48556D'}}></i>
            <i className="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
            </span>  
            <span className="fa-stack fa-lg social-media__icon icon">
            <i className="fas fa-circle fa-stack-2x" style={{color: '#DF4D3B'}}></i>
            <i className="fab fa-google-plus-g fa-stack-1x fa-inverse"></i>
            </span>   
            <span className="fa-stack fa-lg social-media__icon icon">
            <i className="fas fa-circle fa-stack-2x" style={{color: '#48556D'}}></i>
            <i className="fab fa-linkedin-in fa-stack-1x fa-inverse"></i>
            </span>
            </div>
            <fieldset className="form">
                <legend className="form__legend">OR</legend>
                <form action="" className="form__body form-login">  
                <input className="form__input" type="email" placeholder="email" />
                <input className="form__input" type="password" placeholder="password" />   
                <button className="btn" type="submit">Sign in</button> 
                </form>  
            </fieldset>
            </div>

            <div className="switch">
            <div className="switch__text-container"  id="switch-text">
            <h1 className="switch__header header">Not yet a member?</h1>
            <p>Sign up and discover what we can do for you</p>
            </div>
            <button className="btn-white btn" id="switch-button">Sign up</button>
            </div>

            <div className="smooth signup hide-view" id="signup">
            <h1 className="signup__header header">Create a new account</h1>
            <p className="signup__byline">You can use your favourite social network</p>
            <div className="social-media__container">
            <span className="fa-stack fa-lg social-media__icon icon">
            <i className="fas fa-circle fa-stack-2x" style={{color: '#48556D'}}></i>
            <i className="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
            </span>  
            <span className="fa-stack fa-lg social-media__icon icon">
            <i className="fas fa-circle fa-stack-2x" style={{color: '#DF4D3B'}}></i>
            <i className="fab fa-google-plus-g fa-stack-1x fa-inverse"></i>
            </span>   
            <span className="fa-stack fa-lg social-media__icon icon">
            <i className="fas fa-circle fa-stack-2x" style={{color: '#48556D'}}></i>
            <i className="fab fa-linkedin-in fa-stack-1x fa-inverse"></i>
            </span>
            </div>
            <fieldset className="form">
            <legend className="form__legend">OR</legend>
            <form action="" className="form__body form-login">
            <div className="input__group">
                <input className="form__input form__input-half" type="text" placeholder="first name" />
                <input className="form__input form__input-half" type="text" placeholder="last name" />
            </div>
            <div className="input__group">
                <input className="form__input form__input-half" type="email" placeholder="email" />
                <input className="form__input form__input-half" type="password" placeholder="password" />      
            </div>
            <div className="input__group">
                <input className="form__input-checkbox" type="checkbox" /> I have read the <a href="#">terms and conditions</a>
            </div>
            <button className="btn" type="submit">Sign up</button> 
            </form>  
            </fieldset>
            </div>

            </div>
        );
    }
}
export default SignUp;