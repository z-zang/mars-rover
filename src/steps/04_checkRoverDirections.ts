import { prompt } from "../ui/console";
import { default as msg } from "../messages";
import processRoverDirections from "./05_processRoverDirections";
import { MarsRover } from "../types";

const checkRoverDirections = (roverInstructInput: string, roverName: string, marsRoverData: MarsRover): void => {
	const roverDirectionRegex = /^[LMR]+$/;
	const isValidRoverInstructFormat = roverDirectionRegex.test(roverInstructInput);

	if (!isValidRoverInstructFormat) {
		return prompt(msg.checkRoverDirections.failure, checkRoverDirections, roverName, marsRoverData);
	} 
	
	return processRoverDirections(roverInstructInput, roverName, marsRoverData)
}

export default checkRoverDirections