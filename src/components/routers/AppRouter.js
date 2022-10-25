import React, { useEffect, useState } from 'react'
import { 
	BrowserRouter as Router,
	Redirect,
	Switch,
 } from 'react-router-dom';
import { JournalScreen } from '../journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from '../../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../../actions/notes';

export const AppRouter = () => {
	const dispatch = useDispatch();

	const [cheking, setCheking] = useState(true); //va a estar en true mientras espera la respuesta de firebase si estamo logueados o no
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		//se dispara cada vez q cambie el autentificacion
		firebase.auth().onAuthStateChanged((user) => {
			// console.log(user);
			if(user?.uid) {
				//si ya esta logueado q se setee el state con el uid y displayName del user
				dispatch(login(user.uid, user.displayName));
				setIsLoggedIn(true); //esta logueado
				dispatch(startLoadingNotes(user.uid)); //cargar las notas, aca solo debe disparar acciones la logica en otros archivo
			} else {
				setIsLoggedIn(false);
			}
			setCheking(false);//ya tengo la respuesta de firebase
		});
	}, [dispatch, setCheking, setIsLoggedIn]);//como no depende de nadie solo se ejecuta 1 vez cuando inicia la pagina, tmb se dispara cuando cambia la autentificacion
	//dispatch, setCheking: normal lo puedo poner ahi ya q no va acambiar

	if(cheking) {
		return (
			<h1>Wait...</h1>
		)
	}
	return (
		<Router>
			<div>
				<Switch>
					{/* cuando no estamos logueados */}
					<PublicRoute 
						path="/auth" 
						component={ AuthRouter }
						isAuthenticate={ isLoggedIn }
					/>
					{/* cuando estamos logueados */}
					<PrivateRoute
						isAuthenticate={ isLoggedIn }
						path="/" 
						exact 
						component={ JournalScreen }
					/>
					<Redirect to="/auth/login"/>
				</Switch>
			</div>
		</Router>
	)
}
