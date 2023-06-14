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

export function prompt(question: string, callback: (...args: any) => void, ...rest: any[]): void {
	readline.moveCursor(process.stdout, 0, -1); // delete reprint of input

	reader.question(`\n❓ ${question} \n\n👉 `, (answer: string) => callback(answer, ...rest));
}