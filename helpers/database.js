const fs = require('fs');

const file = './database/data.json';

const loadDatabase = () => {
	/* return new Promise((res, rej) => {
		fs.readFile(file, (err, data) => {
			if(err) return res({});
			res(JSON.parse(data));
		})
	}); */

	if(!fs.existsSync(file)) return {};
	const data = fs.readFileSync(file);
	return JSON.parse(data);
}

const saveData = data => fs.writeFileSync(file, JSON.stringify(data));



module.exports = {loadDatabase, saveData};