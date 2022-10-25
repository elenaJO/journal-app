import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';

export const PublicRoute = ({
	isAuthenticate,
	component: Component,
	...rest
}) => {
	return (
		// hago para que el usuario no piense q salio de sesion cuando va a la url /login me va a redireccionar a marvel
		<Route { ...rest } component={(props) => (
			(isAuthenticate)
				? <Redirect to="/"/>
				: <Component { ...props }/>
		)}/>
	)
}

PublicRoute.prototype = {
	component: PropTypes.func.isRequired,
	isAuthenticate: PropTypes.bool.isRequired,
}