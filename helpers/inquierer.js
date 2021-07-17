const inquirer = require('inquirer');
require('colors');

const showHeader = (header) => {

	const blocks = '=============================\n';
	console.log(`${blocks}      ${header + '\n'}${blocks}`.blue);
}

const inquirerMenu = async(header = 'Hello World', options = ['opt1', 'opt2', 'opt3']) => {

	const choices = [];

	options.forEach((el, index) => {
		choices.push({
			value: `${index+1}`,
			name: `${(index+1).toString().blue}${'.'.blue} ${el}`
		})
	});
	choices.push({
			value: '0',
			name: '0. Exit'.red
		});

	console.clear();
	showHeader(header);

	const questions = [
		{
			type: 'list',
			name: 'option',
			message: 'What would you like to do?',
			choices
		}
	];

	const {option} = await inquirer.prompt(questions);
	return option;
}


const pause = () => {
	console.log('\n');

	return inquirer.prompt([{
		type: 'input',
		name: 'continue',
		message: `Press ${'ENTER'.blue} to continue\n`
	}]);
}

const readInput = async() => {

	const question = [{
		type: 'input',
		name: 'description',
		message: 'Description: ',
	}];

	const {description} = await inquirer.prompt(question);
	return description;
}

const showCheckMenuDelete = async(tasks) => {

	/* const choices = [];

	tasks.forEach( task => {
		choices.push({
			value: task.id,
			name: task.description
		})
	}); */

	const choices = tasks.map( task => {
		return {
			value: task.id,
			name: ' '+task.description
		}
	});

	const {ids} = await inquirer.prompt([
				{
					type: 'checkbox',
					name: 'ids',
					message: 'Delete task',
					choices
				}
			]);
	return ids;
}

const confirmDelete = async() => {
	
	const {confirm} = await inquirer.prompt([
			{
				type: 'confirm',
				name: 'confirm',
				message: 'Are you sure you want to delete these tasks?'
			}
		]);
	
	return confirm;
}

const showCheckMenuCompleted = async(tasks) => {
	
	const choices = tasks.map( task => {
		return {
			value: task.id,
			name: ' '+task.description,
			checked: task.completedIn? true: false
		}
	});

	const {ids} = await inquirer.prompt([
				{
					type: 'checkbox',
					name: 'ids',
					message: 'Select completed tasks',
					choices
				}
			]);
	return ids;
}

module.exports = {inquirerMenu, pause, readInput, showCheckMenuDelete, confirmDelete, showCheckMenuCompleted};