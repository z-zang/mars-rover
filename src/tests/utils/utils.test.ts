import { MarsRover, Rover, VALID_DIRECTIONS } from '../../types';
import { default as msg } from '../../messages';
import { 
    processRotation, 
    processMovement,
    checkIsWithinGrid,
    getOtherRoversCoordsArray,
    checkDoesNotClashWithRovers,
    processRoverInstruct,
} from '../../utils/utils'

describe("processRotation function", () => {
    it("should return correct directional string after applying rotation", () => {
        expect(processRotation('L', 'N', VALID_DIRECTIONS)).toBe('W');
        expect(processRotation('L', 'W', VALID_DIRECTIONS)).toBe('S');
        expect(processRotation('L', 'S', VALID_DIRECTIONS)).toBe('E');
        expect(processRotation('L', 'E', VALID_DIRECTIONS)).toBe('N');
        expect(processRotation('R', 'N', VALID_DIRECTIONS)).toBe('E');
        expect(processRotation('R', 'E', VALID_DIRECTIONS)).toBe('S');
        expect(processRotation('R', 'S', VALID_DIRECTIONS)).toBe('W');
        expect(processRotation('R', 'W', VALID_DIRECTIONS)).toBe('N');
    });
});

describe("processMovement function", () => {
    it("should return correct x and y co-ordinates after applying movement letter", () => {
        expect(processMovement({x: 0, y: 0}, 'N')).toEqual({x: 0, y: 1});
        expect(processMovement({x: 0, y: 10}, 'W')).toEqual({x: -1, y: 10});
        expect(processMovement({x: 8, y: 32}, 'S')).toEqual({x: 8, y: 31});
        expect(processMovement({x: -5, y: -5}, 'E')).toEqual({x: -4, y: -5});
    });
});

describe("checkIsWithinGrid function", () => {
    it("should return true if co-ordinates are within grid bounds", () => {
        expect(checkIsWithinGrid({x: 10, y: 10}, {x: 10, y: 10})).toBe(true);
        expect(checkIsWithinGrid({x: 0, y: 0}, {x: 10, y: 10})).toBe(true);
        expect(checkIsWithinGrid({x: 6, y: 5}, {x: 10, y: 10})).toBe(true);
    });
    it("should false if co-ordinates are out of grid bounds", () => {
        expect(checkIsWithinGrid({x: 11, y: 10}, {x: 10, y: 10})).toBe(false);
        expect(checkIsWithinGrid({x: 10, y: 12}, {x: 10, y: 10})).toBe(false);
    });
    it("should false if co-ordinates are negative", () => {
        expect(checkIsWithinGrid({x: -1, y: 4}, {x: 10, y: 10})).toBe(false);
        expect(checkIsWithinGrid({x: 6, y: -1}, {x: 10, y: 10})).toBe(false);
    });
});

describe("checkDoesNotClashWithRovers function", () => {
    let selectedRoverCoord = { 
        x: 3, y: 4, bearing: 'N'
    }

    let clashingRoverCoords = [
        {x: 11, y: 11, bearing: VALID_DIRECTIONS[0]},
        {x: 3, y: 4, bearing: VALID_DIRECTIONS[3]},
        {x: 3, y: 5, bearing: VALID_DIRECTIONS[3]}
    ]

    let safeRoverCoords = [
        {x: 10, y: 10, bearing: VALID_DIRECTIONS[0]},
        {x: 12, y: 12, bearing: VALID_DIRECTIONS[3]},
        {x: 21, y: 21, bearing: VALID_DIRECTIONS[0]}
    ]

    it("should return false if clashing with existing co-ordinates", () => {
        expect(checkDoesNotClashWithRovers(selectedRoverCoord, clashingRoverCoords)).toEqual(false);
    });
    it("should return true if not clashing with existing co-ordinates, or if array is empty", () => {
        expect(checkDoesNotClashWithRovers(selectedRoverCoord, safeRoverCoords)).toEqual(true);
        expect(checkDoesNotClashWithRovers(selectedRoverCoord, [])).toEqual(true);
    });
});

describe("getOtherRoversCoordsArray function", () => {
    let otherRovers = [
        {
            name: 'rover-1',
            positionArr: [
                {x: 10, y: 10, bearing: VALID_DIRECTIONS[0]},
                {x: 12, y: 12, bearing: VALID_DIRECTIONS[3]}
            ]
        },
        {
            name: 'rover-2',
            positionArr: [
                {x: 21, y: 21, bearing: VALID_DIRECTIONS[0]},
                {x: 3, y: 4, bearing: VALID_DIRECTIONS[3]}
            ]
        },
    ]
    let selectedRover: Rover = { 
        name: 'rover-3',
        positionArr: [
            {x: 3, y: 4, bearing: VALID_DIRECTIONS[1]},
            {x: 1, y: 1, bearing: VALID_DIRECTIONS[1]}
        ]
    }

    let expectedCoords = [
        {x: 12, y: 12, bearing: VALID_DIRECTIONS[3]},
        {x: 3, y: 4, bearing: VALID_DIRECTIONS[3]}
    ]

    it("should return an array of the other rovers' latest co-ordinates, excluding coords of the selected rover", () => {
        expect(getOtherRoversCoordsArray(selectedRover, [...otherRovers, selectedRover])).toStrictEqual(expectedCoords);
    });
    it("should return an empty array if no other rovers", () => {
        expect(getOtherRoversCoordsArray(selectedRover, [])).toStrictEqual([]);
    });
});


describe("processRoverInstruct function", () => {
    const data: MarsRover = {
        gridCoords: {
            x: 10,
            y: 10
        },
        rovers: [
            {
                name: 'rover1',
                positionArr: [{
                    x: 8,
                    y: 6,
                    bearing: VALID_DIRECTIONS[0]
                }]
            },
            {
                name: 'rover2',
                positionArr: [{
                    x: 3,
                    y: 3,
                    bearing: VALID_DIRECTIONS[2]
                }]
            },
        ]
    }

    it("should return updated co-ordinates after processing valid directions for selectedRover", () => {
        expect(processRoverInstruct('LMMMMM', data.rovers[1], data, VALID_DIRECTIONS)).toStrictEqual({bearing: 'E', x: 8, y: 3})
    });
    it("should return updated co-ordinates after processing valid directions for selectedRover", () => {
        expect(processRoverInstruct('LLLRRMMLMMM', data.rovers[0], data, VALID_DIRECTIONS)).toStrictEqual({bearing: 'S', x: 6, y: 3})
    });
    it("should throw specific error if the rover moves out of bounds", () => {
        expect(() => processRoverInstruct('LRRMMMMM', data.rovers[0], data, VALID_DIRECTIONS)).toThrow(msg.processRoverInstruct.invalidCoord)
        expect(() => processRoverInstruct('MMMMM', data.rovers[1], data, VALID_DIRECTIONS)).toThrow(msg.processRoverInstruct.invalidCoord)
    });
    it("should throw specific error if the rover clashes with other rover", () => {
        expect(() => processRoverInstruct('LLMMMRMMMMMM', data.rovers[0], data, VALID_DIRECTIONS)).toThrow(msg.processRoverInstruct.roverClash)
        expect(() => processRoverInstruct('RRMMMRMMMMMM', data.rovers[1], data, VALID_DIRECTIONS)).toThrow(msg.processRoverInstruct.roverClash)
    });
});
