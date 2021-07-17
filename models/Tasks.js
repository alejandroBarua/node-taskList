const Task = require('./Task');

class Tasks {

	constructor(data = {}){

		this._list = data;
	}

	get toArray(){
		
		/* const listArray = [];
		Object.keys(this._list).forEach(key => {
			const task = this._list[key];
			listArray.push(task);
		});

		return listArray; */

		return Object.values(this._list);
	}

	get toKeys(){
		return Object.keys(this._list);
	}

	showTasks(){
		const list = this.toArray;

		list.forEach((el, index) => {
			const state = el.completedIn? 'Completed'.green: 'Pending'.red;
			console.log(`${(index+1).toString().blue}${'.'.blue} ${el.description} :: ${state}`);
		});
	}

	showTasksCompleted(res = true){
		const list = this.toArray;
		let count = 1;

		list.forEach((el, index) => {
			if(res){

				if(el.completedIn){
					console.log(`${(count).toString().blue}${'.'.blue} ${el.description} :: ${el.completedIn.green}`);
					count++;
				} 
			}
			else{

				if(!el.completedIn){
					console.log(`${(count).toString().blue}${'.'.blue} ${el.description} :: ${'Pending'.red}`);
					count++;
				} 
			}

		});
	}

	createTask(description){
		
		const task = new Task(description);
		this._list[task.id] = task;
	}

	deleteTask(id = ''){

		if(this._list[id]) delete this._list[id];
	}

	completedTask(idList = ''){

		const keysArray = this.toKeys;
		const pendingTasks = keysArray.filter( key => idList.indexOf(key) == -1);
		pendingTasks.forEach(key => this._list[key].completedIn = null);

		idList.forEach(id =>{

			const date = new Date();
			if(!this._list[id].completedIn) this._list[id].completedIn = date.toLocaleString();
		});
		
	}
}

module.exports = Tasks;