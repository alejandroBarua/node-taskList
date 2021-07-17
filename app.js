require('colors');
const { inquirerMenu, 
				pause, 
				readInput,
				showCheckMenuDelete,
				confirmDelete,
				showCheckMenuCompleted
	} = require('./helpers/inquierer');

const Tasks = require('./models/Tasks');
const {loadDatabase, saveData} = require('./helpers/database');


const main = async() => {

	const header = 'Task organizer', 
	options = [
			'Create tasks',   
			'Show tasks', 
			'Show completed tasks',
			'Show pending tasks',
			'Complete tasks',
			'Delete tasks',
		];

	let opt = '';

	const data = loadDatabase();
	const tasks = new Tasks(data);
	
 	do {
		
		opt = await inquirerMenu(header, options);

		switch (opt) {
			case '1':
				console.log('to exit enter an empty description'.red);
				let description = await readInput();
				if(description === '') break;
				tasks.createTask(description);

				while(description !== ''){
					description = await readInput();
					if(description === '') break;
					tasks.createTask(description);
				}
				break;
			case '2':
				tasks.showTasks();
				break;
			case '3':
				tasks.showTasksCompleted();
				break;
			case '4':
				tasks.showTasksCompleted(false);
				break;
			case '5':
				let idListCompleted = await showCheckMenuCompleted(tasks.toArray);
				tasks.completedTask(idListCompleted);
				break;
			case '6':
				let idListDelete = await showCheckMenuDelete(tasks.toArray);
				if(idListDelete.length !== 0){
					if(await confirmDelete()){
						idListDelete.forEach(id => {tasks.deleteTask(id)});
						console.log('Tasks were deleted');
					}
				}	
				break;
			}
			
		saveData(tasks._list);
		if(opt !== '0') await pause();
		
	} while (opt !== '0');

}

main();
