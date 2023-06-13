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