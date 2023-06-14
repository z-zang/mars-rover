import * as ui from '../../ui/console';
import checkNewRoverCoords from '../../steps/02_checkNewRoverCoords';

const spy = jest.spyOn(ui, 'prompt').mockImplementation(() => {})

describe("checkNewRoverCoords function", () => {
    /**
    fail 1: incorrect input format
    	return prompt(msg.checkRoverCoords.failure, checkNewRoverCoords, marsRoverData);
	
    fail2: if rover is out of bounds 
        if (!(isWithinGrid && doesNotClashWithRovers)) {
            return prompt(msg.processRoverCoords.failure, checkNewRoverCoords, marsRoverData);
        }
    
    success: call processNewRoverCoords(roverPosition, marsRoverData); with modified data

    */

    it("should return correct directional string after applying rotation", () => {
    //     expect(processRotation('L', 'N', VALID_DIRECTIONS)).toBe('W');
    //     expect(processRotation('L', 'W', VALID_DIRECTIONS)).toBe('S');
    //     expect(processRotation('L', 'S', VALID_DIRECTIONS)).toBe('E');
    //     expect(processRotation('L', 'E', VALID_DIRECTIONS)).toBe('N');
    //     expect(processRotation('R', 'N', VALID_DIRECTIONS)).toBe('E');
    //     expect(processRotation('R', 'E', VALID_DIRECTIONS)).toBe('S');
    //     expect(processRotation('R', 'S', VALID_DIRECTIONS)).toBe('W');
    //     expect(processRotation('R', 'W', VALID_DIRECTIONS)).toBe('N');
    });
});