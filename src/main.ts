import { clear, print, askQuestion } from './ui/console';
import { MAX_AMOUNT_OF_ROVERS } from './config';
import {
	Direction,
	Instruct,
	Rotation,
	Position,
	Coords,
	Rover,
	MarsRover,
	isDirection,
	VALID_DIRECTIONS,
	VALID_INSTRUCTS,
	VALID_ROTATIONS,
	marsRoverData
} from './types';


export const marsRoverStart = (): void => {
	clear(false);
	print('--------------------------');
	print('| Welcome to Mars Rover |');
	print('--------------------------');

	const startText = `Please enter the upper-right co-ordinates of the plateau, 
	represented by 2 integers, eg: 5 5`

	askQuestion(startText, checkGridCoordinates);
}

const checkGridCoordinates = (gridCoordInput: string): void => {
	const gridCoords: string[] = gridCoordInput.split(' ');
	const gridCoordsRegex = /^\d+$/;

	const isValidGridCoords: Boolean = gridCoords.length === 2
		&& gridCoordsRegex.test(gridCoords[0]) && gridCoordsRegex.test(gridCoords[1]);
	
	if (isValidGridCoords) {
		const plateauCoordsArr = gridCoords.map(coord => Number(coord))
		marsRoverData.plateauCoords.x = plateauCoordsArr[0];
		marsRoverData.plateauCoords.y = plateauCoordsArr[1];

		const successPromptText = `Valid co-ordinates received. For the first rover, please enter: 
			\n - the starting co-ordinates, represented by 2 integers 
			\n - and the cardinal position it's facing, represented by either N | S | W | E. 
			\nEg: 1 2 N`


		askQuestion(successPromptText, checkRoverCoordinates, marsRoverData);

	} else {
		const failPromptText = `Invalid input detected. Please try again.`
		askQuestion(failPromptText, checkGridCoordinates);
	}
	
}
// TODO: currently, marsROverdata includes itself
const isNonClashingRoverCoord = (roverCoord: Coords, plateauCoords: Coords, roversArr: Rover[]): boolean => {
	const {x: roverCoordX, y: roverCoordY} = roverCoord;
	console.log('rovercoord',roverCoord)
	
	const coordsToCompare = [plateauCoords]

	if (marsRoverData.rovers.length > 0) {
		const otherRoverCoords: Position[] = roversArr.map((rover) => rover.positionArr[rover.positionArr.length - 1])
		coordsToCompare.push(...otherRoverCoords)
	}

	console.log('coordsToCompare', coordsToCompare)

	const isValidRoverCoord = coordsToCompare.every((coord) => {
		return !(roverCoordX === coord.x && roverCoordY === coord.y)
	})

	const isPositiveCoord = roverCoordX >= 0 && roverCoordY >= 0

	const isWithinPlateau = roverCoordX <= plateauCoords.x && roverCoordY <= plateauCoords.y

	return isValidRoverCoord && isPositiveCoord && isWithinPlateau
}

const checkRoverCoordinates = (roverCoordInput: string) => {
	console.log('roverCoordInput', roverCoordInput)
	const roverCoords: string[] = roverCoordInput.split(' ');

	// todo: extract NSWE into string, put into config file, 
	// create regex by using constructor and passing in dynamic variable

	const roverCoordRegex = /^[0-9]+ [0-9]+ [NSWE]$/;

	const isValidRoverCoordFormat: boolean = roverCoordRegex.test(roverCoordInput) 

	if (isValidRoverCoordFormat) {
		// console.log('isValidRoverCoords (in terms of format)', isValidRoverInput)
		const [roverCoordX, roverCoordY ]: number[] = roverCoords.slice(0, 2).map(coord => Number(coord))
		const roverDirection = isDirection(roverCoords[2])

		const isValidRoverCoord = isNonClashingRoverCoord({x:roverCoordX, y:roverCoordY }, marsRoverData.plateauCoords, marsRoverData.rovers)

		if (isValidRoverCoord) {
			// todo: move away from zero indexed array
			const roverCurrentIndex = marsRoverData.rovers.length + 1 // breaks if starting with non 0 arr.

			marsRoverData.rovers.push({
				name: `rover-${roverCurrentIndex}`,
				positionArr: [{
					x: roverCoordX, 
					y: roverCoordY, 
					bearing: roverDirection
				}]
			})

			console.log('marsRoverIndex', roverCurrentIndex)

			// ask for 3rd input
			console.log('coords in bounds')
			console.log('marsRoverData', marsRoverData)

			const successPromptText = `Valid co-ordinates received. For the first rover, please enter the directions you would like it to travel in, represented by instructions L, R, or M.
			\nEg: LMLMLRMMMRMRMLMR`

			askQuestion(successPromptText, (roverInstructInput: string) => checkRoverDirections(roverInstructInput, roverCurrentIndex, marsRoverData) , marsRoverData);

		} else {
			// TODO: error logging of exact co-ordinate
			const failurePromptText = `invalid rover coords - out of bounds, or clashes with another rover. please try again`

			askQuestion(failurePromptText, checkRoverCoordinates, marsRoverData);
		}
	} else {
		const failurePromptText = `invalid rover coords format. please try again`

		askQuestion(failurePromptText, checkRoverCoordinates, marsRoverData);
	}
}

export const checkRoverDirections = (roverInstructInput: string, roverCurrentIndex: number, marsRoverData: MarsRover): void => {
	const roverInputRegex = /^[LMR]+$/;
	const isValidRoverInstructFormat = roverInputRegex.test(roverInstructInput);

	if (!isValidRoverInstructFormat) {
		const failurePromptText = `invalid rover direction input. please try again`

		askQuestion(failurePromptText, (roverInstructInput: string) => checkRoverDirections(roverInstructInput, roverCurrentIndex, marsRoverData), marsRoverData);

	} else {
		try {
			const newRoverPosition = processRoverInstruct(roverInstructInput, marsRoverData);
			console.log('newRoverPosition', newRoverPosition);

			let currentRover = marsRoverData.rovers[roverCurrentIndex - 1]
			console.log('currentRover', currentRover)

			marsRoverData.rovers[roverCurrentIndex - 1].positionArr.push(newRoverPosition);

			if (marsRoverData.rovers.length === MAX_AMOUNT_OF_ROVERS) {
				// return all data, finish program
				clear(true);
				console.log('Maximum amount of rovers added. Final co-ordinates:')
				marsRoverData.rovers.forEach(rover => {
					const {x, y, bearing} = rover.positionArr[rover.positionArr.length -1 ]
					print(`${x} ${y} ${bearing}`)
				})

			} else {
				const successPromptText = `Valid co-ordinates received. For the next rover, please enter: 
				\n - the starting co-ordinates.`
	
				askQuestion(successPromptText, checkRoverCoordinates, marsRoverData);
			}

		} catch (error) {
			const outOfBoundsPromptText = `rover instructions have caused it to go out of bounds or clash with another rover. please try inputting directions again.`
	
			askQuestion(outOfBoundsPromptText, (roverInstructInput: string) => checkRoverDirections(roverInstructInput, roverCurrentIndex, marsRoverData) , marsRoverData);
		}

	}
}


export const processRoverInstruct = (roverInstructInput: string, marsRoverData: MarsRover): Position => {
	const roverStartPosition = marsRoverData.rovers[0].positionArr.slice(-1)[0] // access last element in arr
	let currentCoords = { x: roverStartPosition.x, y: roverStartPosition.y }
	let currentBearing = roverStartPosition.bearing;
	const roversToCompare = marsRoverData.rovers.filter(rover => {
		return rover.positionArr[rover.positionArr.length - 1] !== roverStartPosition // works because it's same reference
	})
	
	roverInstructInput.split('').forEach((letter)=> {
		console.log('currentCoords', currentCoords)

		switch(letter) {
			case 'L':
				currentBearing = processRotation(letter, currentBearing);
				break;
			case 'R':
				currentBearing = processRotation(letter, currentBearing);
				break;
			case 'M':
				currentCoords = processMovement(currentCoords, currentBearing)
				const isNonClashingCoord = isNonClashingRoverCoord(currentCoords, marsRoverData.plateauCoords, roversToCompare);

				console.log('isNonClashingCoord', isNonClashingCoord)
				if (!isNonClashingCoord) {
					throw new Error('FAILED - ROVER OUT OF BOUNDS, OR CLASHES WITH ANOTHER ROVER')
				}
		  }
	})

	return {
		...currentCoords,
		bearing: currentBearing
	}
}

export const processRotation = (rotation: Rotation, currentBearing: Direction): Direction => {
	const bearingStartingIndex = VALID_DIRECTIONS.indexOf(currentBearing)
	let bearingNextIndex: number;

	if (rotation === 'R') {
		// rotate clockwise
		bearingNextIndex = bearingStartingIndex + 1
	} else { 
		// rotate antiClockwise
		bearingNextIndex = bearingStartingIndex -1
	}

	// if index circles past array, apply correction
	if (bearingNextIndex === 4) { bearingNextIndex = 0}
	if (bearingNextIndex === -1) { bearingNextIndex = 3}

	return VALID_DIRECTIONS[bearingNextIndex];
}
export const processMovement = (currentCoords: Coords, currentBearing: Direction): Coords => {
	let processedCoords = currentCoords;

	switch(currentBearing) {
		case 'N':
			processedCoords.y +=1
			break;
		case 'E':
			processedCoords.x +=1
			break;
		case 'S':
			processedCoords.y -=1
			break;
		case 'W':
			processedCoords.x -=1
			break;
	}
	return processedCoords;
}


marsRoverStart();