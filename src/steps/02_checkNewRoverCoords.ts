import { prompt } from "../ui/console";
import { default as msg } from "../messages";
import processNewRoverCoords from "./03_processNewRoverCoords";
import { checkIsWithinGrid, checkDoesNotClashWithRovers } from "../utils/utils";
import { MarsRover, isDirection } from "../types";

const checkNewRoverCoords = (roverCoordInput: string, marsRoverData: MarsRover): void => {
	const roverCoords: string[] = roverCoordInput.split(' ');
	const roverCoordRegex = /^[0-9]+ [0-9]+ [NSWE]$/;
	const isValidRoverCoordFormat: boolean = roverCoordRegex.test(roverCoordInput);

	if (!isValidRoverCoordFormat) {
		return prompt(msg.checkRoverCoords.failure, checkNewRoverCoords, marsRoverData);
	}

	const [roverCoordX, roverCoordY ]: number[] = roverCoords.slice(0, 2).map(coord => Number(coord))
	const roverBearing = isDirection(roverCoords[2]) // typescript raised an error re. type safety!
	
	const roverPosition = {
		x: roverCoordX, 
		y: roverCoordY, 
		bearing: roverBearing
	}

	const otherRoversCoordsArray = marsRoverData.rovers.map(rover => rover.positionArr.slice(-1)[0])
	const isWithinGrid = checkIsWithinGrid(roverPosition, marsRoverData.gridCoords)
	const doesNotClashWithRovers = checkDoesNotClashWithRovers(roverPosition, otherRoversCoordsArray)

	if (!(isWithinGrid && doesNotClashWithRovers)) {
		return prompt(msg.processRoverCoords.failure, checkNewRoverCoords, marsRoverData);
	}

	return processNewRoverCoords(roverPosition, marsRoverData);
}

export default checkNewRoverCoords