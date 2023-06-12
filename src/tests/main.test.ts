import { checkRoverDirections, processRoverInstruct, processRotation, processMovement } from '../main';
import { VALID_DIRECTIONS } from '../types';
import { MAX_AMOUNT_OF_ROVERS } from '../config';

describe("processRotation function", () => {
    it("should return valid directional string", () => {
        expect(processRotation('L', 'N')).toBe('W');
        expect(processRotation('L', 'W')).toBe('S');
        expect(processRotation('L', 'S')).toBe('E');
        expect(processRotation('L', 'E')).toBe('N');
        expect(processRotation('R', 'N')).toBe('E');
        expect(processRotation('R', 'E')).toBe('S');
        expect(processRotation('R', 'S')).toBe('W');
        expect(processRotation('R', 'W')).toBe('N');
    });
});

describe("processMovement function", () => {
    it("should return valid x and y co-ordinates", () => {
        expect(processMovement({x: 0, y: 0}, 'N')).toEqual({x: 0, y: 1});
        expect(processMovement({x: 0, y: 10}, 'W')).toEqual({x: -1, y: 10});
        expect(processMovement({x: 8, y: 32}, 'S')).toEqual({x: 8, y: 31});
        expect(processMovement({x: -5, y: -5}, 'E')).toEqual({x: -4, y: -5});
    });
});

describe("processRoverInstruct function", () => {
    it("should throw error if at any point, values go below 0", () => {
        const data = {
            plateauCoords: {
                x: 20,
                y: 20
            },
            rovers: [
                {
                    name: 'rover1',
                    positionArr: [{
                        x: 0,
                        y: 0,
                        bearing: VALID_DIRECTIONS[2]
                    }]
                }
            ]
        }

        expect(() => processRoverInstruct('MMM', data)).toThrow('FAILED - ROVER OUT OF BOUNDS')
        // expect(processRoverInstruct([0, 10], 'W')).toEqual([-1, 10]);
        // expect(processRoverInstruct([8, 32], 'S')).toEqual([8, 31]);
        // expect(processRoverInstruct([-5, -5], 'E')).toEqual([-4, -5]);
    });
});

describe("checkRoverDirections function", () => {
    it("should throw error if at any point, values go below 0", () => {
        const data = {
            plateauCoords: {
                x: 20,
                y: 20
            },
            rovers: [
                {
                    name: 'rover1',
                    positionArr: [{
                        x: 0,
                        y: 0,
                        bearing: VALID_DIRECTIONS[2]
                    }]
                }
            ]
        }

        const logSpy = jest.spyOn(global.console, 'log');
        // checkRoverDirections('MMM', data)
        expect(logSpy).toHaveBeenCalledWith('yeeehawwww', ['Error: FAILED - ROVER OUT OF BOUNDS'])
        // expect(processRoverInstruct([0, 10], 'W')).toEqual([-1, 10]);
        // expect(processRoverInstruct([8, 32], 'S')).toEqual([8, 31]);
        // expect(processRoverInstruct([-5, -5], 'E')).toEqual([-4, -5]);
    });
});

