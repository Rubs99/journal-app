import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
     Redirect
} from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from '../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';


export const AppRouter = () => {

   const dispatch=useDispatch();

   const [checking, setchecking] = useState(true);
   const [isLoggedIn, setisLoggedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async(user) => {


            if (user?.uid) {

                dispatch(login(user.uid, user.displayName));
                setisLoggedIn(true);
                dispatch(startLoadingNotes(user.uid));
            }else{
                setisLoggedIn(false);

            }

            setchecking(false);
           
        });

    }, [dispatch,setchecking]);

    if(checking){

        
        return(
            <h1>Wait...</h1>
        )

    }

    return (
        <Router>

            <div>

                <Switch>
                    <PublicRoute
                        path="/auth"
                        isAuthenticated={isLoggedIn}
                        component={AuthRouter}
                    />

                    <PrivateRoute
                        exact
                        isAuthenticated={isLoggedIn}
                        path="/"
                        component={JournalScreen}

                    />

                    <Redirect to="/auth/login" />




                </Switch>

            </div>

        </Router>
    )
}
