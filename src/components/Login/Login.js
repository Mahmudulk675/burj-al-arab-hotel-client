import React, { useContext } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth'
import firebaseConfig from './firebase.config'
import {UserContext} from '../../App'
import { useHistory, useLocation } from 'react-router';


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history =useHistory();
    const location =useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */       
                const {displayName, email} = result.user;
                const newUser ={name:displayName, email}
                setLoggedInUser(newUser);
                storeAuthToken()
                
                // ...
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                // ...
            });
    }

    const storeAuthToken = ()=>{
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
          .then(function(idToken) {
             sessionStorage.setItem('token', idToken);
             history.replace(from)
          }).catch(function(error) {
            // Handle error
          });
    }

    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google</button>
        </div>
    );
};

export default Login;