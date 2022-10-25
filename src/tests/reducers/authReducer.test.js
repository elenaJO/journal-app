import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('Pruebas en authReducer', () => {
  test('debe de realizar el login', () => {

		const initState = {};
		const action = {
			type: types.login,
			payload: {
				uid: 'abc',
				displayName: 'Elena',
			}
		};
		const state = authReducer(initState, action);
		expect(state).toEqual({
			uid: 'abc',
			name: 'Elena',
		});
	});

	test('debe de realizar el logout', () => {

		const initState = {
			uid: 'abc',
			displayName: 'Elena',
		};

		const action = {
			type: types.logout
		};
		const state = authReducer(initState, action);
		expect(state).toEqual({});
	})

	test('no debe hacer cambios en state', () => {

		const initState = {
			uid: 'abc',
			displayName: 'Elena',
		};

		const action = {
			type: 'cualquiercosa'
		};
		const state = authReducer(initState, action);
		expect(state).toEqual(initState);
	})
	  
})
