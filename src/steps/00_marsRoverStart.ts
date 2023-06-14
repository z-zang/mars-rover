import { clear, print, prompt } from '../ui/console';
import checkGridCoords from '../steps/01_checkGridCoords';
import { MarsRover } from '../types';

import { default as msg } from '../messages';

const marsRoverStart = (marsRoverData: MarsRover): void => {
	clear(false);
	print('-----------------------------------');
	print('|      Welcome to Mars Rover      |');
	print('-----------------------------------');

	prompt(msg.marsRoverStart.success, checkGridCoords, marsRoverData);
}

export default marsRoverStart