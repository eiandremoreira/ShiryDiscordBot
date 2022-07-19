const paises_array = require('../../Structures/json/l.json');
const fetch = require('node-fetch');

async function translate (...q) {
	const url = `http://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${q}&ie=UTF-8&oe=UTF-8`;
	const info = await fetch(encodeURI(url));
	const res = await info.text();
	const body = JSON.parse(await res)[0][0][0];

	return body;
}

async function response (lang) {


	function shuffleArray (arr) {
		// Loop em todos os elementos
		for (let i = arr.length - 1; i > 0; i--) {
			// Escolhendo elemento aleatório
			const j = Math.floor(Math.random() * (i + 1));
			// Reposicionando elemento
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		// Retornando array com aleatoriedade
		return arr;
	}


	if(lang == 'en') {
		let response = {};


		const maxNumbers = 235;
		let list = [];

		for (let i = 0; i < maxNumbers; i++) {
			list[i] = i;
		}

		list = shuffleArray(list);


		let word1_1 = await translate(`país ${paises_array[`${list[0]}`].pais}`);
		let word1_2 = await translate(`país ${paises_array[`${list[1]}`].pais}`);
		let word1_3 = await translate(`país ${paises_array[`${list[2]}`].pais}`);
		let word1_4 = await translate(`país ${paises_array[`${list[3]}`].pais}`);
		let word1_5 = await translate(`país ${paises_array[`${list[4]}`].pais}`);


		const certa = paises_array[list[2]];


		response.pais = {};
		response.pais.name = await translate(`país ${certa.pais}`);
		response.pais.img = certa.img;
		response.pais.continente = await translate(`continente ${certa.continente}`);
		response.pais.ddi = certa.ddi;

		response.pais.name = response.pais.name.replace(/ country/g, '').replace(/country /g, '');
		response.pais.continente = response.pais.continente.replace(/ continent/g, '').replace(/continent /g, '');

		response.alternative = shuffleArray([
			{
				label: word1_1.replace(/ country/g, '').replace(/country /g, ''),
				value: `${word1_1.replace(/ country/g, '').replace(/country /g, '')},${word1_3.replace(/ country/g, '').replace(/country /g, '')}`,
			},
			{
				label: word1_2.replace(/ country/g, '').replace(/country /g, ''),
				value:  `${word1_2.replace(/ country/g, '').replace(/country /g, '')},${word1_3.replace(/ country/g, '').replace(/country /g, '')}`,
			},
			{
				label: word1_3.replace(/ country/g, '').replace(/country /g, ''),
				value:  `${word1_3.replace(/ country/g, '').replace(/country /g, '')},${word1_3.replace(/ country/g, '').replace(/country /g, '')}`,
			},
			{
				label: word1_4.replace(/ country/g, '').replace(/country /g, ''),
				value:  `${word1_4.replace(/ country/g, '').replace(/country /g, '')},${word1_3.replace(/ country/g, '').replace(/country /g, '')}`,
			},
			{
				label: word1_5.replace(/ country/g, '').replace(/country /g, ''),
				value:  `${word1_5.replace(/ country/g, '').replace(/country /g, '')},${word1_3.replace(/ country/g, '').replace(/country /g, '')}`,
			},
		]);

		return response;

	}
	else {
		let response = {};

		const maxNumbers = 235;
		let list = [];

		for (let i = 0; i < maxNumbers; i++) {
			list[i] = i;
		}

		list = shuffleArray(list);

		let word1_1 = paises_array[`${list[0]}`].pais;
		let word1_2 = paises_array[`${list[1]}`].pais;
		let word1_3 = paises_array[`${list[2]}`].pais;
		let word1_4 = paises_array[`${list[3]}`].pais;
		let word1_5 = paises_array[`${list[4]}`].pais;

		const certa = paises_array[list[2]];

		response.pais = {};
		response.pais.name = certa.pais;
		response.pais.img = certa.img;
		response.pais.continente = certa.continente;
		response.pais.ddi = certa.ddi;
		response.alternative = shuffleArray([
			{
				label: word1_1,
				value: `${word1_1},${word1_3}`,
			},
			{
				label: word1_2,
				value:  `${word1_2},${word1_3}`,
			},
			{
				label: word1_3,
				value:  `${word1_3},${word1_3}`,
			},
			{
				label: word1_4,
				value:  `${word1_4},${word1_3}`,
			},
			{
				label: word1_5,
				value:  `${word1_5},${word1_3}`,
			},
		]);


		return response;
	}

}


module.exports = { response };
