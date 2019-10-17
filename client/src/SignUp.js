import React from 'react';
import './DottedBox.css';
import { Redirect } from "react-router-dom";
class SignUp extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            
            signup: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            },

            login : {
                email: '',
                password: ''
            },

            redirectToHome : false
        }
    }

    handleChange = pr => event => {
        event.persist();
        this.setState({signup:{...this.state.signup, [pr]: event.target.value}})
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
            username : this.state.login.username,
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
            // localStorage.setItem("token", JSON.stringify(myJson));
            /*
                TODO: we must use redirect component from React-Router-Dom <Redirect>
            */
        //    window.location.href = "http://localhost:3000/profile";
        })
        ;
    }

    signUp = () => {
        console.info(this.state);
        let data = {
            firstName : this.state.signup.firstName,
            lastName : this.state.signup.lastName,
            email : this.state.signup.email,
            password : this.state.signup.password
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
            header : 'هنوز عضو نشده اید؟',
            byline : 'ثبت نام کنید و ببیند چه ویدیوهایی در این سایت می توانید مشاهده کنید',
            buttonText: 'ورود'
        },
        
        signup : {
            header : 'قبلا عضو بوده اید?',
            byline : 'وارد شوید و ویدیوهای جدید را مشاهده کنید',
            buttonText: 'ورود'    
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
        if(this.state.redirectToHome) {
            return (
                <Redirect to="/" />
            )
        } else {
            return (
                <div className="main-page">
                <div className="smooth login" id="login">
                <h1 
                    className="login__header header iranfont"
                    >
                    به فیزیک اپ خوش آمدید
                </h1>
                <p className="login__byline iranfont">بهترین پلتفرم آموزش فیزیک با بیش از صدها هزار ساعت ویدیوی آموزشی</p>
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
                    <legend className="form__legend iranfont">یا</legend>
                    <form action="" className="form__body form-login">  
                    <input 
                        className="form__input iranfont" 
                        type="text" 
                        placeholder="نام کاربری" 
                        value={this.state.login.username || ''}
                        onChange={this.setLoginInfo('username')}
                        />
                    <input 
                        className="form__input iranfont" 
                        type="password" 
                        placeholder="کلمه عبور" 
                        value={this.state.login.password || ''}
                        onChange={this.setLoginInfo('password')}
                        />   
                    <button 
                        className="btn iranfont" 
                        type="button"
                        onClick={this.authenticate}
                        >
                            ورود
                        </button> 
                    </form>  
                </fieldset>
                </div>
    
                <div className="switch">
                <div className="switch__text-container"  id="switch-text">
                <h1 className="switch__header header iranfont">هنوز عضو نیستید؟</h1>
                <p className="iranfont">ثبت نام کنید و از آموزش به سبک جدید فیزیک لذت ببرید</p>
                </div>
                <button className="btn-white btn iranfont" id="switch-button">ثبت نام</button>
                </div>
    
                <div className="smooth signup hide-view" id="signup">
                <h1 className="signup__header header iranfont">یک اکانت جدید بسازید</h1>
                <p className="signup__byline iranfont">برای ثبت نام از شبکه های اجتماعی هم می توانید استفاده کنید</p>
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
                <legend className="form__legend iranfont">یا</legend>
                <form action="" className="form__body form-login">
                <div className="input__group">
                    <input 
                        className="form__input form__input-half iranfont" 
                        type="text" 
                        placeholder="نام"
                        value={this.state.signup.firstName}
                        onChange={this.handleChange('firstName')}
                        />
                    <input 
                        className="form__input form__input-half iranfont" 
                        type="text" 
                        placeholder="نام خانوادگی" 
                        value={this.state.signup.lastName}
                        onChange={this.handleChange('lastName')}
                        />
                </div>
                <div className="input__group">
                    <input 
                        className="form__input form__input-half iranfont" 
                        type="email" 
                        placeholder="آدرس ایمیل" 
                        value={this.state.signup.email}
                        onChange={this.handleChange('email')}
                        />
                    <input 
                        className="form__input form__input-half iranfont" 
                        type="password" 
                        placeholder="کلمه عبور" 
                        value={this.state.signup.password}
                        onChange={this.handleChange('password')}
                        />      
                </div>
                <div className="input__group">
                    <input className="form__input-checkbox iranfont" type="checkbox" /> <span className="iranfont">را خوانده ام </span><a href="#" className="iranfont">قوانین و مقررات</a>
                </div>
                <button 
                    className="btn iranfont" 
                    type="button"
                    onClick={this.signUp}
                    >ثبت نام</button> 
                </form>  
                </fieldset>
                </div>
    
                </div>
            );
        }
        
    }
}
export default SignUp;