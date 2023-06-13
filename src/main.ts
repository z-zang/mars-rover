import { clear, print, prompt } from './ui/console';
import { MAX_AMOUNT_OF_ROVERS, EXPECTED_NUM_OF_COORDS } from './config';
import { processRoverInstruct, checkIsWithinGrid, checkDoesNotClashWithRovers } from './utils/utils';
import {
	Position,
	MarsRover,
	isDirection,
	VALID_DIRECTIONS,
	marsRoverData
} from './types';

import messages from './messages';

export const marsRoverStart = (): void => {
	clear(false);
	print('-----------------------------------');
	print('|      Welcome to Mars Rover      |');
	print('-----------------------------------');

	prompt(messages.marsRoverStart.success, checkGridCoordinates, false);
}

export const checkGridCoordinates = (gridCoordInput: string): void => {
	const gridCoords: string[] = gridCoordInput.split(' ');
	const gridCoordsRegex = /^\d+$/;

	const isValidCoordFormat = gridCoords.every((str) => gridCoordsRegex.test(str))
	const isAboveZero = gridCoords.every((str) => Number(str) > 0)
	const isExpectedNumOfCoords = gridCoords.length === EXPECTED_NUM_OF_COORDS
	
	if (!(isValidCoordFormat && isAboveZero && isExpectedNumOfCoords)) {
		return prompt(messages.checkGridCoordinates.failure, checkGridCoordinates);
	}
	
	const gridCoordsArr = gridCoords.map(coord => Number(coord))

	marsRoverData.gridCoords = {
		x: gridCoordsArr[0],
		y: gridCoordsArr[1]
	}

	prompt(messages.checkGridCoordinates.succcess, checkNewRoverCoordinates);
}

export const checkNewRoverCoordinates = (roverCoordInput: string): void => {
	const roverCoords: string[] = roverCoordInput.split(' ');
	const roverCoordRegex = /^[0-9]+ [0-9]+ [NSWE]$/;
	const isValidRoverCoordFormat: boolean = roverCoordRegex.test(roverCoordInput);

	if (!isValidRoverCoordFormat) {
		return prompt(messages.checkRoverCoordinates.failure, checkNewRoverCoordinates);
	}

	const [roverCoordX, roverCoordY ]: number[] = roverCoords.slice(0, 2).map(coord => Number(coord))
	const roverDirection = isDirection(roverCoords[2]) // typescript raised an error re. type safety!
	
	const roverPosition = {
		x: roverCoordX, 
		y: roverCoordY, 
		bearing: roverDirection
	}

	const otherRoversCoordsArray = marsRoverData.rovers.map(rover => rover.positionArr.slice(-1)[0])
	const isWithinGrid = checkIsWithinGrid(roverPosition, marsRoverData.gridCoords)
	const doesNotClashWithRovers = checkDoesNotClashWithRovers(roverPosition, otherRoversCoordsArray)

	if (!(isWithinGrid && doesNotClashWithRovers)) {
		const failurePromptText = messages.processRoverCoordinates.failure
		return prompt(failurePromptText, checkNewRoverCoordinates);
	}
	
	processNewRoverCoordinates(roverPosition);
}

export const processNewRoverCoordinates = (roverPosition: Position): void => {
	const roverCurrentIndex = marsRoverData.rovers.length + 1 
	const roverName = `rover-${roverCurrentIndex}`

	marsRoverData.rovers.push({
		name: roverName,
		positionArr: [{...roverPosition}]
	})

	const successPromptText = messages.processRoverCoordinates.success
	const callbackCheckRoverDirections = (roverInstructInput: string) => checkRoverDirections(roverInstructInput, roverName, marsRoverData)
	
	prompt(successPromptText, callbackCheckRoverDirections);
}

export const checkRoverDirections = (roverInstructInput: string, roverName: string, marsRoverData: MarsRover): void => {
	const roverDirectionRegex = /^[LMR]+$/;
	const isValidRoverInstructFormat = roverDirectionRegex.test(roverInstructInput);

	if (!isValidRoverInstructFormat) {
		const failurePromptText = messages.checkRoverDirections.failure
		const callbackCheckRoverDirections = (roverInstructInput: string) => checkRoverDirections(roverInstructInput, roverName, marsRoverData)
		return prompt(failurePromptText, callbackCheckRoverDirections);
	} 
	
	processRoverDirections(roverInstructInput, roverName, marsRoverData)
}

export const processRoverDirections = (roverInstructInput: string, roverName: string, marsRoverData: MarsRover) => {
	try {							
		// added fallback value as Typescript throws an error, even though the element will definitely be in the object
		const selectedRover = marsRoverData.rovers.find((rover) => rover.name === roverName) || marsRoverData.rovers[0] 
		
		const newRoverPosition = processRoverInstruct(roverInstructInput, selectedRover, marsRoverData, VALID_DIRECTIONS);
		selectedRover.positionArr.push(newRoverPosition);

		if (marsRoverData.rovers.length !== MAX_AMOUNT_OF_ROVERS) {
			const successPromptText = messages.processRoverDirections.success
			prompt(successPromptText, checkNewRoverCoordinates);
		} else {
			printFinalRoverData(marsRoverData);
		}

	} catch (error) {
		let errorMessage = ''
		if (error instanceof Error) errorMessage = error.message

		const failurePromptText = messages.processRoverDirections.failure(errorMessage)
		const retry = (roverInstructInput: string) => checkRoverDirections(roverInstructInput, roverName, marsRoverData)
		prompt(failurePromptText, retry);
	}
}

export const printFinalRoverData = (marsRoverData: MarsRover): void => {
	clear(true);
	print(messages.printFinalRoverData.success);

	marsRoverData.rovers.forEach(rover => {
		const {x, y, bearing} = rover.positionArr[rover.positionArr.length -1 ]
		print(`${x} ${y} ${bearing}`)
	})

	process.exit();
}

marsRoverStart();