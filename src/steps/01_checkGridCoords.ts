import { prompt } from "../ui/console";
import { default as msg } from "../messages";
import checkNewRoverCoords from "./02_checkNewRoverCoords";
import { MarsRover } from "../types";
import { EXPECTED_NUM_OF_COORDS } from "../config";

const checkGridCoords = (gridCoordInput: string, marsRoverData: MarsRover): void => {
	const gridCoords: string[] = gridCoordInput.split(' ');
	const gridCoordsRegex = /^\d+$/;

	const isValidCoordFormat = gridCoords.every((str) => gridCoordsRegex.test(str))
	const isAboveZero = gridCoords.every((str) => Number(str) > 0)
	const isExpectedNumOfCoords = gridCoords.length === EXPECTED_NUM_OF_COORDS

	if (!(isValidCoordFormat && isAboveZero && isExpectedNumOfCoords)) {
		prompt(msg.checkGridCoords.invalidFormat, checkGridCoords, marsRoverData);
	} else {
		const gridCoordsArr = gridCoords.map(coord => Number(coord))

		marsRoverData.gridCoords = {
			x: gridCoordsArr[0],
			y: gridCoordsArr[1]
		}
	
		prompt(msg.checkGridCoords.success, checkNewRoverCoords, marsRoverData);
	}
}

export default checkGridCoords