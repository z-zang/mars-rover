import { print, clear } from "../ui/console";
import { default as msg } from "../messages";
import { MarsRover } from "../types";

const printFinalRoverData = (marsRoverData: MarsRover): void => {
	clear(true);
	print(msg.printFinalRoverData.success);

	marsRoverData.rovers.forEach(rover => {
		const {x, y, bearing} = rover.positionArr.slice(-1)[0]
		print(`${x} ${y} ${bearing}`)
	})

	process.exit();
}
export default printFinalRoverData