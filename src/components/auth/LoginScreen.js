import React from 'react'
import{useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom';
import {  startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
export const LoginScreen = () => {


    const dispatch = useDispatch();
   const {loading}= useSelector(state=>state.ui);
    const [formValues,handleInputChange]= useForm({
        
    })

    const {email,password}= formValues;

     const handleLogin=(e)=>{

        e.preventDefault();
        dispatch(startLoginEmailPassword(email, password));
        
    }

    const handleGoogleLogin=()=>{
        dispatch(startGoogleLogin());
    }
    return (
        <div>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    value={email}
                    onChange={handleInputChange}
                />
              
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    autoComplete="off"
                    value={password}
                    onChange={handleInputChange}
                />
            
                   {}
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                    
                 

                >

                    Ingresar

                </button>

               
                <div className="auth__social-networks">
                    <p>Login with social network</p>
                    < div
                        className=" google-btn "
                        onClick={handleGoogleLogin}
                    >
                        < div className=" google-icon-wrapper " >
                            < img className=" google-icon " src=" https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg " alt=" botón de Google " />
                        </ div >
                        < p className=" btn-text " >
                            < b > Iniciar sesión con google </ b >
                        </ p >
                    </ div >
                </div>
                <Link to="/auth/register"
                className="link"
               
                >
                     Create new acount
                
                </Link>


            </form>
        </div>
    )
}
