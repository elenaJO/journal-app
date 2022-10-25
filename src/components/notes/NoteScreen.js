import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

	const dispatch = useDispatch();
	const { active: note } = useSelector(state => state.notes);

	const [ formValues, handleInputChange, reset ] = useForm(note); //solo se inicia una vez y cuando hago clic en otratrajeta no cambia
	const { body, title, id } = formValues;
	const activeId = useRef(note.id); // el activeId almacena el primero note.id q selecciono
	
	useEffect(() => {
		if (note.id !== activeId.current) {
			reset(note);
			activeId.current = note.id; //le seteo par q actualice el nuevo note
		}
	}, [note, reset]);

	useEffect(() => {
		dispatch(activeNote(formValues.id, { ...formValues }));
	}, [formValues, dispatch]);

	const handleDelete = () => {
		dispatch(startDeleting(id));
	}

	return (
		<div className="notes__main--content">
			<NotesAppBar />
			<div className="notes__content">
				<input
					type="text"
					placeholder="Some awesome title"
					className="notes__title--input"
					value={ title }
					name="title"
					onChange={ handleInputChange }
				/>
				<textarea
					placeholder="What happened today"
					className="notes__textarea"
					value={ body }
					name="body"
					onChange={ handleInputChange }
				/>
				{ note.url && 
					<div className="notes-image">
						<img 
							src={ note.url }
							alt="imagen"/>
					</div> 
				}
			</div>
			<button 
				className="btn btn-danger"
				onClick={ handleDelete }
			>
				Delete
			</button>
		</div>
	)
}
