import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries'

export const Siderbar = () => {
	const dispatch = useDispatch();

	const { name } = useSelector(state => state.auth);

	const handleLogout = () => {
		dispatch(startLogout());
	}

	const handleAddNew = () => {
		dispatch(startNewNote());
	}

	return (
		<aside className="journal__siderbar">
			<div className="journal__siderba--navbar">
				<h3 className="mt-5">
					<i className="far fa-moon"></i>
					<span>{ name }</span>
				</h3>
				<button className="btn" onClick={ handleLogout }>
					Logout
				</button>
			</div>
			<div 
				className="journal__new--entry"
				onClick={ handleAddNew }
			>
				<i className="far fa-calendar-plus fa-4x"></i>
				<p className="mt-5">New Entry</p>
			</div>
			<JournalEntries />
		</aside>
	)
}
