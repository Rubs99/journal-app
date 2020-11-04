import React from 'react'
import{ Link} from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { removeError, setError } from '../../actions/ui'
import { startRegisterWithEmailPasswordName } from '../../actions/auth'
export const RegisterScreen = () => {

    const dispatch= useDispatch();
    const {msgError}= useSelector(state=>( state.ui));
    console.log(msgError);

    const [formValues,handleInputChange]= useForm({
        name:'Rubs',
        email:'ruben@gmail.com',
        password:'123456',
        confirm:'123456'
    })

    const {name,email,password,confirm}= formValues;


    const handleRegister=(e)=>{
        e.preventDefault();
        if(isFormValid()){
          dispatch(startRegisterWithEmailPasswordName(email,password,name));
        }
       
       
    }

    const isFormValid=()=>{


        if(name.trim().length===0){
            dispatch(setError('name is required'))
            return false;
        }else if(!validator.isEmail(email)){
          
            dispatch(setError('email its not value'));
            return false;

        }else if(password!== confirm || password.length<5){
         
            dispatch(setError('password must be more than 6 caracters'));
            return false;
            

        }
        

        dispatch(removeError())

        return true;
    }
   


    return (
        <div>
            
            <div>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleRegister}>

                {
                    msgError &&
                   (<div
                className="auth__alert-error"
                >{msgError}
                
                </div> )
                }

            <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    value={name}
                    onChange={handleInputChange}
                />
                <br/>

                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    value={email}
                    onChange={handleInputChange}
                />
                
                <br/>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    autoComplete="off"
                    value={password}
                    onChange={handleInputChange}
                />
                  <br/>
              
              <input
                  type="password"
                  placeholder="Confirm"
                  name="confirm"
                  className="auth__input"
                  autoComplete="off"
                  value={confirm}
                  onChange={handleInputChange}
              />
            

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                 

                >

                    Registrar

                </button>

               
                
                <Link to="/auth/login"
                className="link"
               
                >
                    Already registered?
                
                </Link>


            </form>
        </div>
        </div>
    )
}
