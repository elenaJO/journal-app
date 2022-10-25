
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startUploading } from '../../actions/notes';
import { fileUpload } from '../../helpers/fileUpload';

jest.mock("../../helpers/fileUpload", () => {
  return {
    fileUpload: () => {
      return Promise.resolve(
        "https://this-represents-an-url.com/photo.png"
      );
    },
  };
});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
	auth: {
		uid: 'TESTING'
	},
	notes: {
		active: {
			id: '	alTca3V1BJDwTdicEnrH',
			title: 'Titulo editado',
			body: 'cuerpo editado'
		}
	}
}

let store = mockStore(initState)

describe('prueba con las acciones de notes', () => {

	test('startUploading debe de actualizar el url del entry', async() => {

		const file = new File([], 'foto.png');
		await store.dispatch(startUploading(file));
		//no funciona investigar porq
	})
})
