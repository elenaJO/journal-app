import cloudinary from 'cloudinary'

import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({ 
  cloud_name: 'ele1993', 
  api_key: '864893344215472', 
  api_secret: 'DsJk3UtCQZYg77UGT775H4kg94s' 
});

describe('Pruebas en fileUpload', () => {
	test('debe cargar un archivo y retornar el URL', async() => {
		//las pruebas lo estamos corriendo en el servidor node no en la web
		//estamos traendo una imagen
		//instalo el cloudinary --save-dev solo me sirve en desarrollo
		const resp = await fetch('https://image.flaticon.com/icons/png/512/1183/1183723.png');
		const blob = await resp.blob();

		const file = new File([blob], 'foto.png');
		const url = await fileUpload(file);
		expect(typeof url).toBe('string');

		//borrar imagen por ID
		const segments = url.split('/');
		const imageId = segments[segments.length - 1].replace('.png', '');
		await cloudinary.v2.api.delete_resources( imageId, {}, ()=> {console.log('');});
	}, 20000)


	test('debe de retornar un error', async() => {
		
		const file = new File([], 'foto.png');
		const url = await fileUpload(file);
		expect(url).toBe(null);
	})
})
