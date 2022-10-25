import { removeError, setError } from "../../actions/ui"
import { types } from "../../types/types";

describe('pruebas en ui action', () => {
	test('todas las acciones debe de crearse', () => {

		//las acciones sincronas regresan un objeto, mientras q las asincronas regresan una funcion que recibe un dispatch
		const action = setError('HELP!!!');
		expect(action).toEqual({
			type: types.uiSetError,
			payload: 'HELP!!!'
		});

		const removeErrorAction = removeError();
		expect(removeErrorAction).toEqual({
			type: types.uiRemoveError
		});
	});
})
