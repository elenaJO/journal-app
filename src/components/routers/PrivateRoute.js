import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types';

export const PrivateRoute = ({
	isAuthenticate,
	component: Component,
	...rest
}) => {
	return (
		<Route { ...rest } component={(props) => (
			(isAuthenticate)
				? <Component { ...props }/>
				: <Redirect to="/auth/login"/>
		)}/>
	)
}

PrivateRoute.propTypes = {
	isAuthenticate: PropTypes.bool.isRequired,
	component: PropTypes.func.isRequired, //ya q trabajamos con function component
}
