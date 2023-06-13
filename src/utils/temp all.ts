// helper function file

export const marsRoverDataTest: MarsRover = {
	gridCoords: {
		x: 0,
		y: 0
	},
	rovers: [
		{
			name: 'rover-1',
			positionArr: [
				{x: 10, y: 10, bearing: 'N'},
				{x: 11, y: 11, bearing: 'N'},
				{x: 12, y: 12, bearing: 'S'}
			]
		},
		{
			name: 'rover-2',
			positionArr: [
				{x: 20, y: 20, bearing: 'N'},
				{x: 21, y: 21, bearing: 'N'},
				{x: 22, y: 22, bearing: 'S'}
			]
		},
	]
}


import { Rotation, Direction, Position, Coords, Rover, MarsRover } from "../types";
import messages from "../messages";

export const processRoverInstruct = (roverInstructInput: string, marsRoverData: MarsRover, VALID_DIRECTIONS: readonly Direction[]): Position => {
	const roverStartPosition = marsRoverData.rovers[0].positionArr.slice(-1)[0]
	let currentCoords = { x: roverStartPosition.x, y: roverStartPosition.y }
	let currentBearing = roverStartPosition.bearing;

	const roversToCompare = marsRoverData.rovers.filter(rover => {
		return rover.positionArr.slice(-1)[0] !== roverStartPosition // works because it's same reference - to check
	})

	console.log('marsRoverData', marsRoverData)
	
	
	roverInstructInput.split('').forEach((letter)=> {
		console.log('marsRoverData', marsRoverData.rovers[0].positionArr)
		switch(letter) {
			case 'L':
				currentBearing = processRotation(letter, currentBearing, VALID_DIRECTIONS);
				break;
			case 'R':
				currentBearing = processRotation(letter, currentBearing, VALID_DIRECTIONS);
				break;
			case 'M':
				currentCoords = processMovement(currentCoords, currentBearing);
				const isValidCoord = isNonClashingCoord(currentCoords, marsRoverData.gridCoords, roversToCompare);

				if (!isValidCoord) {
					throw new Error(messages.processRoverInstruct.error)
				}
		  }
	})

	return {
		...currentCoords,
		bearing: currentBearing
	}
}

export const processRotation = (rotation: Rotation, currentBearing: Direction, VALID_DIRECTIONS: readonly Direction[]): Direction => {
	const bearingStartingIndex = VALID_DIRECTIONS.indexOf(currentBearing)
	let bearingNextIndex: number;

	if (rotation === 'R') {
		bearingNextIndex = bearingStartingIndex + 1
	} else { 
		bearingNextIndex = bearingStartingIndex -1
	}

	// if index circles past ends of array, apply correction
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


export const isNonClashingCoord = (roverCoord: Coords, gridCoords: Coords, roversArr: Rover[]): boolean => {
	const {x: roverCoordX, y: roverCoordY} = roverCoord;
	console.log('rovercoord',roverCoord)
	
	const coordsToCompare = []

	if (roversArr.length > 0) {
		const otherRoverCoords: Position[] = roversArr.map((rover) => rover.positionArr[rover.positionArr.length - 1])
		coordsToCompare.push(...otherRoverCoords)
	}

	console.log('coordsToCompare', coordsToCompare)

	const isValidRoverCoord = coordsToCompare.every((coord) => {
		return !(roverCoordX === coord.x && roverCoordY === coord.y)
	})

	const isPositiveCoord = roverCoordX >= 0 && roverCoordY >= 0

	const isWithinGrid = roverCoordX <= gridCoords.x && roverCoordY <= gridCoords.y

	return isValidRoverCoord && isPositiveCoord && isWithinGrid
}

// export const isNonClashingCoord = (roverCoord: Coords, gridCoords: Coords, roversArr: Rover[]): boolean => {
// 	const { x: roverCoordX, y: roverCoordY } = roverCoord;
// 	const isPositiveCoord = roverCoordX >= 0 && roverCoordY >= 0
// 	const isWithinGrid = roverCoordX <= gridCoords.x && roverCoordY <= gridCoords.y

// 	if (isPositiveCoord === false) return false
// 	if (isWithinGrid === false) return false

// 	const doesNotClashWithRovers = checkForRoverClash(roverCoord, roversArr);

// 	return doesNotClashWithRovers;
// }

// const checkForRoverClash = (roverCoord: Coords, roversArr: Rover[]): boolean => {
// 	const { x: roverCoordX, y: roverCoordY } = roverCoord;
// 	const roversToCompare = [];

// 	if (roversArr.length > 0) {
// 		const otherRoverCoords: Position[] = roversArr.map((rover) => rover.positionArr.slice(-1)[0])
// 		roversToCompare.push(...otherRoverCoords)
// 	}

// 	const doesNotClashWithRovers = roversToCompare.every((coord) => {
// 		return !(roverCoordX === coord.x && roverCoordY === coord.y)
// 	})

// 	return doesNotClashWithRovers
// }
