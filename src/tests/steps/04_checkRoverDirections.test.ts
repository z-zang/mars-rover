import { VALID_DIRECTIONS } from '../../types';

import checkRoverDirections from '../../steps/04_checkRoverDirections';

describe("checkRoverDirections function", () => {
    /**
    if incorrect format: 
        it should call: return prompt(msg.checkRoverDirections.failure, checkRoverDirections, roverName, marsRoverData);

    if correct format: 
	    it should call return processRoverDirections(roverInstructInput, roverName, marsRoverData)

    
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