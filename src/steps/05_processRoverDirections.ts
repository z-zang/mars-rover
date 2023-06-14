import { prompt } from "../ui/console";
import { default as msg } from "../messages";

import checkRoverDirections from "./04_checkRoverDirections";
import checkNewRoverCoords from "./02_checkNewRoverCoords";
import printFinalRoverData from "./06_printFinalRoverData";
import { processRoverInstruct } from "../utils/utils";

import { MarsRover, VALID_DIRECTIONS } from "../types";

const processRoverDirections = (roverInstructInput: string, roverName: string, marsRoverData: MarsRover) => {
    const MAX_AMOUNT_OF_ROVERS = 2; 

    try {							
		// added fallback value as Typescript throws an error, even though the element will definitely be in the object
		const selectedRover = marsRoverData.rovers.find((rover) => rover.name === roverName) || marsRoverData.rovers[0] 
		
		const newRoverPosition = processRoverInstruct(roverInstructInput, selectedRover, marsRoverData, VALID_DIRECTIONS);
		selectedRover.positionArr.push(newRoverPosition);

		if (marsRoverData.rovers.length < MAX_AMOUNT_OF_ROVERS) {
			return prompt(msg.processRoverDirections.success, checkNewRoverCoords, marsRoverData)
		} else {
			return printFinalRoverData(marsRoverData);
		}

	} catch (error) {
		let errorMessage = ''
		if (error instanceof Error) errorMessage = error.message

		const failurePromptText = msg.processRoverDirections.failure(errorMessage)
		prompt(failurePromptText, checkRoverDirections, roverName, marsRoverData);
	}
}

export default processRoverDirections