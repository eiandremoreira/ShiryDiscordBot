const paises_array = require('../../Structures/json/l.json');
const fetch = require('node-fetch');

async function translate (q, r) {
	const url = `http://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${q, ' ', r}&ie=UTF-8&oe=UTF-8`;
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


		const certa = paises_array[list[2]];

		response.pais = {};
		response.pais.name = await translate('país', certa.pais);
		response.pais.img = certa.img;
		response.pais.continente = await translate('continent', certa.continente);
		response.pais.ddi = certa.ddi;

		response.pais.name = response.pais.name.replace(/ country/g, '').replace(/country /g, '');
		response.pais.continente = response.pais.continente.replace(/ continent/g, '').replace(/continent /g, '');
		if(certa.continente == 'África/Ásia') certa.continente = 'África';
		let con = await translate('continent', certa.continente);
		let cont = con.replace(/ continent/g, '').replace(/continent /g, '');

		let europa = await translate('continent', 'Europa');
		let africa = await translate('continent', 'África');
		let asia = await translate('continent', 'Ásia');
		let oceania = await translate('continent', 'Oceania');
		let amsul = await translate('continent', 'América do Sul');
		let amnor = await translate('continent', 'América do Norte');
		let amcen = await translate('continent', 'América Central');

		response.alternative = shuffleArray([
			{
				label: europa.replace(/ continent/g, '').replace(/continent /g, ''),
				value: `${europa.replace(/ continent/g, '').replace(/continent /g, '')},${cont}`,
			},
			{
				label: africa.replace(/ continent/g, '').replace(/continent /g, ''),
				value:  `${africa.replace(/ continent/g, '').replace(/continent /g, '')},${cont}`,
			},
			{
				label: asia.replace(/ continent/g, '').replace(/continent /g, ''),
				value:  `${asia.replace(/ continent/g, '').replace(/continent /g, '')},${cont}`,
			},
			{
				label: oceania.replace(/ continent/g, '').replace(/continent /g, ''),
				value:  `${oceania.replace(/ continent/g, '').replace(/continent /g, '')},${cont}`,
			},
			{
				label: amsul.replace(/ continent/g, '').replace(/continent /g, ''),
				value:  `${amsul.replace(/ continent/g, '').replace(/continent /g, '')},${cont}`,
			},
			{
				label: amnor.replace(/ continent/g, '').replace(/continent /g, ''),
				value:  `${amnor.replace(/ continent/g, '').replace(/continent /g, '')},${cont}`,
			},
			{
				label: amcen.replace(/ continent/g, '').replace(/continent /g, ''),
				value:  `${amcen.replace(/ continent/g, '').replace(/continent /g, '')},${cont}`,
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


		const certa = paises_array[list[2]];

		response.pais = {};
		response.pais.name = certa.pais;
		response.pais.img = certa.img;
		response.pais.continente = certa.continente;
		response.pais.ddi = certa.ddi;

		if(certa.continente == 'África/Ásia') certa.continente = 'África';
		let con = certa.continente;
		let cont = con;
		response.alternative = shuffleArray([
			{
				label: 'Europa',
				value: `Europa,${cont}`,
			},
			{
				label: 'África',
				value:  `África,${cont}`,
			},
			{
				label: 'Ásia',
				value:  `Ásia,${cont}`,
			},
			{
				label: 'Oceania',
				value:  `Oceania,${cont}`,
			},
			{
				label: 'América do Sul',
				value:  `América do Sul,${cont}`,
			},
			{
				label: 'América do Norte',
				value:  `América do Norte,${cont}`,
			},
			{
				label: 'América Central',
				value:  `América Central,${cont}`,
			},
		]);


		return response;
	}
}


module.exports = { response };