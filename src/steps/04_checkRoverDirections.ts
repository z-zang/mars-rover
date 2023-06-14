import { prompt } from "../ui/console";
import { default as msg } from "../messages";
import processRoverDirections from "./05_processRoverDirections";
import { MarsRover } from "../types";

const checkRoverDirections = (roverInstructInput: string, roverName: string, marsRoverData: MarsRover): void => {
	const roverDirectionRegex = /^[LMR]+$/;
	const isValidRoverInstructFormat = roverDirectionRegex.test(roverInstructInput);

	if (!isValidRoverInstructFormat) {
		prompt(msg.checkRoverDirections.invalidFormat, checkRoverDirections, roverName, marsRoverData);
	} else {
		processRoverDirections(roverInstructInput, roverName, marsRoverData)
	}
}

export default checkRoverDirections