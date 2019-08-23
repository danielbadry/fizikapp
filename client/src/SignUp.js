import React from 'react';
import './DottedBox.css';

class SignUp extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            signup: {
                firstName: '',
                lastName: '',
                email: ''
            },
            login : {
                email: '',
                password: ''
            }
        }
    }

    handleChange = pr => event => {
        event.persist();
        this.setState((state, props) => {
            return {[pr]: event.target.value};
        });
    };
    
    setLoginInfo = pr => event => {
        event.persist();
        this.setState({login:{...this.state.login, [pr]: event.target.value}})
    };

    /*
        TODO: i must use oAuth technik in login because we use REST endpoint
    */
    authenticate = (event) => {
        event.preventDefault();
        let data = {
            email : this.state.login.email,
            password : this.state.login.password
        }
        fetch('http://localhost:1337/users/authenticate', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .then(myJson => {
            console.info('myJson:', myJson);
            localStorage.setItem("userInfo", JSON.stringify(myJson));
            /*
                TODO: we must use redirect component from React-Router-Dom <Redirect>
            */
           window.location.href = "http://localhost:3000/profile";
        })
        ;
    }

    signUp = () => {
        let data = {
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            email : this.state.email
        }
        fetch('http://localhost:1337/users', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .then(myJson => {
            console.info('myJson:', myJson);
        })
        ; // parses JSON response into native JavaScript objects 
    }
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
                <input 
                    className="form__input" 
                    type="email" 
                    placeholder="email" 
                    value={this.state.login.email || ''}
                    onChange={this.setLoginInfo('email')}
                    />
                <input 
                    className="form__input" 
                    type="password" 
                    placeholder="password" 
                    value={this.state.login.password || ''}
                    onChange={this.setLoginInfo('password')}
                    />   
                <button 
                    className="btn" 
                    type="submit"
                    onClick={this.authenticate}
                    >
                        Sign in
                    </button> 
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
                <input 
                    className="form__input form__input-half" 
                    type="text" 
                    placeholder="first name"
                    value={this.state.firstName}
                    onChange={this.handleChange('firstName')}
                    />
                <input 
                    className="form__input form__input-half" 
                    type="text" 
                    placeholder="last name" 
                    value={this.state.lastName}
                    onChange={this.handleChange('lastName')}
                    />
            </div>
            <div className="input__group">
                <input 
                    className="form__input form__input-half" 
                    type="email" 
                    placeholder="email" 
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    />
                <input className="form__input form__input-half" type="password" placeholder="password" />      
            </div>
            <div className="input__group">
                <input className="form__input-checkbox" type="checkbox" /> I have read the <a href="#">terms and conditions</a>
            </div>
            <button 
                className="btn" 
                type="submit"
                onClick={this.signUp}
                >Sign up</button> 
            </form>  
            </fieldset>
            </div>

            </div>
        );
    }
}
export default SignUp;