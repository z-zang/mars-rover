import { clear, print, prompt } from './ui/console';
import checkGridCoords from './steps/01_checkGridCoords';
import { MarsRover, marsRoverData } from './types';

import { default as msg } from './messages';

export const marsRoverStart = (marsRoverData: MarsRover): void => {
	clear(false);
	print('-----------------------------------');
	print('|      Welcome to Mars Rover      |');
	print('-----------------------------------');

	prompt(msg.marsRoverStart.success, checkGridCoords, marsRoverData);
}

marsRoverStart(marsRoverData);