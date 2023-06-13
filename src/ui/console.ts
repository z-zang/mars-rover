import * as readline from 'node:readline';

export function print(str: string): void {
	console.log(str);
	console.log();
}

export function clear(addTopBorder: boolean): void {
	console.clear();
	if (addTopBorder) {
		print('------------------------------------');
	}
}

const reader = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

export function prompt(question: string, callback: (arg: string) => void, deleteNextLine: boolean = true) {
	// if (deleteNextLine === true) readline.moveCursor(process.stdout, 0, -1);

	reader.question(`\n❓ ${question} \n\n👉 `, callback);
}