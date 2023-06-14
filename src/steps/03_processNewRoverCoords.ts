import { prompt } from "../ui/console";
import { default as msg } from "../messages";
import checkRoverDirections from "./04_checkRoverDirections";
import { MarsRover, Position } from "../types";

const processNewRoverCoords = (roverPosition: Position, marsRoverData: MarsRover): void => {
	const roverCurrentIndex = marsRoverData.rovers.length + 1 
	const roverName = `rover-${roverCurrentIndex}`

	marsRoverData.rovers.push({
		name: roverName,
		positionArr: [{...roverPosition}]
	})

	prompt(msg.processRoverCoords.success, checkRoverDirections, roverName, marsRoverData);
}

export default processNewRoverCoords