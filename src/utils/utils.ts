// helper function file

import { Rotation, Direction, Position, Coords, Rover, MarsRover } from "../types";
import messages from "../messages";

export const getOtherRoversCoordsArray = (selectedRover: Rover, roversArr: Rover[]): Coords[] => {
	const otherRovers = roversArr.filter((rover => rover.name !== selectedRover.name))
	return otherRovers.map(rover => rover.positionArr.slice(-1)[0])
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

export const checkIsWithinGrid = (roverCoord: Coords, gridCoords: Coords): boolean => {
	const { x: roverCoordX, y: roverCoordY } = roverCoord;
	const isPositiveCoord = roverCoordX >= 0 && roverCoordY >= 0
	const isWithinGridBounds = roverCoordX <= gridCoords.x && roverCoordY <= gridCoords.y

	return isPositiveCoord && isWithinGridBounds;
}

export const checkDoesNotClashWithRovers = (roverCoord: Coords, roversCoordsToCompare: Coords[]): boolean => {
	const { x: roverCoordX, y: roverCoordY } = roverCoord;

	if (roversCoordsToCompare.length === 0) return true;

	return roversCoordsToCompare.every((coord) => {
		return !(roverCoordX === coord.x && roverCoordY === coord.y)
	})
}

export const processRoverInstruct = (roverInstructInput: string, selectedRover: Rover, marsRoverData: MarsRover, VALID_DIRECTIONS: readonly Direction[]): Position => {
	console.log('roverInstructInput', roverInstructInput)
	console.log('selectedRover', selectedRover)
	console.log('marsRoverData', marsRoverData)
	console.log('marsRoverData.rovers', marsRoverData.rovers)
	console.log('marsRoverData.rovers', marsRoverData.rovers[0].positionArr)
	const roverStartPosition = selectedRover.positionArr.slice(-1)[0]
	let currentCoords = { x: roverStartPosition.x, y: roverStartPosition.y }
	let currentBearing = roverStartPosition.bearing;

	const roversCoordsToCompare = getOtherRoversCoordsArray(selectedRover, marsRoverData.rovers)
	
	console.log('roversCoordsToCompare', roversCoordsToCompare)

	roverInstructInput.split('').forEach((letter)=> {
		console.log('current', currentCoords , currentBearing)
		console.log('letter', letter)
		switch(letter) {
			case 'L':
				currentBearing = processRotation(letter, currentBearing, VALID_DIRECTIONS);
				break;
			case 'R':
				currentBearing = processRotation(letter, currentBearing, VALID_DIRECTIONS);
				break;
			case 'M':
				currentCoords = processMovement(currentCoords, currentBearing);

				const isWithinGrid = checkIsWithinGrid(currentCoords, marsRoverData.gridCoords);
				const doesNotClashWithRovers = checkDoesNotClashWithRovers(currentCoords, roversCoordsToCompare);
				if (!isWithinGrid) {
					throw new Error(messages.processRoverInstruct.invalidCoord)
				}
				if (!doesNotClashWithRovers) {
					throw new Error(messages.processRoverInstruct.roverClash)
				}
		  }
	})

	return {
		...currentCoords,
		bearing: currentBearing
	}
}

