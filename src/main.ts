import marsRoverStart from "./steps/00_marsRoverStart";
import { MarsRover } from "./types";

// Initial program data.
export const marsRoverData: MarsRover = {
	gridCoords: {
		x: 0,
		y: 0
	},
	rovers: []
}

marsRoverStart(marsRoverData);

