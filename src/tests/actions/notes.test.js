/** * @jest-environment node */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startNewNote, startLoadingNotes, startSaveNote } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';
// import { fileUpload } from '../../helpers/fileUpload';

// jest.mock('../../helpers/fileUpload', () => ({
// 	fileUpload: jest.fn(() => {
// 		return 'https://hola-mundo.com/cosa.jpg';
// 		// return Promise.resolve('https://hola-mundo.com/cosa.jpg');
// 	})
// }))
 
const middlewares = [thunk];
const mockStore = configureStore(middlewares); //me auyuda a crear el store

//como quiero q este el estado del store en esos momentos
const initState = {
	auth: {
		uid: 'TESTING'
	},
	notes: {
		active: {
			id: 'RUSL49PQqvnSbhkG6sct',
			title: 'Titulo editado',
			body: 'cuerpo editado'
		}
	}
}

let store = mockStore(initState)

describe('prueba con las acciones de notes', () => {
	//se dispara antes de cada prueba
	beforeEach(() => {
		//limpiar el store
		store = mockStore(initState)
	});

	test('debe de crear una nueva nota startNewnOTE', async() => {
		//el mock store ayuda hasta hacer dispatch de acciones

		//estamos disparando la accion, y await por q es asincrono
		//los testing no se hace en pruebas de produccion

		//debemos tener 3 bases de datos, desarrollo , production y testing
		await store.dispatch(startNewNote());
		const actions = store.getActions(); //las acciones q se disparo , primero tiene q suceder lo q arriba
		expect(actions[0]).toEqual({
			type: types.notesActive,
			payload: {
				id: expect.any(String), //cualquier string
				title: '',
				body: '',
				date: expect.any(Number),
			}
		});
		expect(actions[1]).toEqual({
			type: types.notesAddNew,
			payload: {
				id: expect.any(String), //cualquier string
				title: '',
				body: '',
				date: expect.any(Number),
			}
		});

		//borrar para q no se llene la bd
		const docId = actions[0].payload.id;
		await db.doc(`/TESTING/journal/notes/${docId}`).delete();
	});

	test('startLoadingNotes debe de cargar notas', async() => {
		await store.dispatch(startLoadingNotes('TESTING'));
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: types.notesLoad,
			payload: expect.any(Array)
		});

		const expected = {
			id: expect.any(String),
			title: expect.any(String),
			body: expect.any(String),
			date: expect.any(Number)
		}

		expect(actions[0].payload[0]).toMatchObject(expected);
	});

	test('startSaveNote debe de atualizar la nota', async() => {
		const note = {
			id: 'RUSL49PQqvnSbhkG6sct',
			title: 'Titulo editado',
			body: 'cuerpo editado'
		}

		await store.dispatch(startSaveNote(note));
		const actions = store.getActions();
		expect (actions[0].type).toBe(types.notesUpdated);

		const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get() //regresa la referencia al documento;
		expect(docRef.data().title).toBe(note.title);
	});

	//evaluamos el producto de las acciones
	// test('startUploading debe de actualizar el url del entry', async() => {
	// 	const resp = await fetch('https://image.flaticon.com/icons/png/512/1183/1183723.png');
	// 	const blob = await resp.blob();

	// 	const file = new File([blob], 'foto.png');
	// 	await store.dispatch(startUploading(file));
	// })
	
})
