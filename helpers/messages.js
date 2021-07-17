require ('colors');

const showMenu = (header = 'Select an option', options = []) => {

	return new Promise( (res, err) => {
		
			console.clear();
		
			const blocks = '=============================\n';
		
			console.log(`${blocks}      ${header + '\n'}${blocks}`.blue);
		
			const len = options.length;
			for(let i = 0; i < len; i++){
				console.log(`${(i+1).toString().blue}. ${options[i]}`);
			}
		
			console.log(`${'0.'.red} Exit\n`);
		
			const readline = require('readline').createInterface({
				input: process.stdin,
				output: process.stdout
			});
		
			readline.question(`Select an option: `, (opt) => {
				readline.close();
				res(opt)
			});	

	});
}

const pause = () => {

	return new Promise((res, err) => {
		
		const readline = require('readline').createInterface({
			input: process.stdin,
			output: process.stdout
		});
	
		readline.question(`Press ${'ENTER'.blue} to continue\n`, () => {
			readline.close();
			res();
		});	
	});
}

module.exports = { showMenu , pause}

/* 
// app.js

const { showMenu, pause } = require('./helpers/messages');

const main = async() => {

	const header = 'Task organizer',
		options = [
			'Create task', 
			'Show tasks', 
			'Show completed tasks',
			'Show pending tasks',
			'Complete tasks',
			'Delete task',
		];

	let opt = ''; 
	
	do {

		opt = await showMenu(header, options);
		console.log({opt});
		
		if(opt !== '0') await pause();
		
	} while (opt !== '0');

}

main();

*/