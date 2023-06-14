import * as ui from '../../ui/console';
import { default as msg } from '../../messages';
import checkNewRoverCoords from '../../steps/02_checkNewRoverCoords';
import processNewRoverCoords from '../../steps/03_processNewRoverCoords';
import { MarsRover } from '../../types';

const mockPrompt = jest.spyOn(ui, 'prompt').mockImplementation(() => {})
jest.mock('../../steps/03_processNewRoverCoords', () => jest.fn());

const { invalidFormat, invalidCoord } = msg.checkNewRoverCoords;

export const marsTestData: MarsRover = {
	gridCoords: {
		x: 10,
		y: 10
	},
    rovers: [
		{
			name: 'rover-1',
			positionArr: [
				{x: 5, y: 5, bearing: 'N'},
			]
		},
    ]
}

afterEach(() => {    
    jest.clearAllMocks();
});

describe("checkNewRoverCoords function", () => {
    describe('should call prompt() with expected args when passed incorrect string, with invalidFormat message, itself as fn(), and unmodified data', () => {
        it("alphabetic string", () => {
            checkNewRoverCoords('asdfghjkl', marsTestData)
            expect(mockPrompt).toHaveBeenCalledTimes(1)
            expect(mockPrompt).toHaveBeenCalledWith(invalidFormat, checkNewRoverCoords, marsTestData)
        });
        it("numbers and other symbols", () => {
            checkNewRoverCoords('1238$£(*^@3{]34234', marsTestData)
            expect(mockPrompt).toHaveBeenCalledTimes(1)
            expect(mockPrompt).toHaveBeenCalledWith(invalidFormat, checkNewRoverCoords, marsTestData)
        });
        it("No letters", () => {
            checkNewRoverCoords('88 88', marsTestData)
            expect(mockPrompt).toHaveBeenCalledTimes(1)
            expect(mockPrompt).toHaveBeenCalledWith(invalidFormat, checkNewRoverCoords, marsTestData)
        });
        it("Lowercase letter", () => {
            checkNewRoverCoords('88 88 s', marsTestData)
            expect(mockPrompt).toHaveBeenCalledTimes(1)
            expect(mockPrompt).toHaveBeenCalledWith(invalidFormat, checkNewRoverCoords, marsTestData)
        });


    })

    describe('should call prompt() with expected args when passed correct string, but makes rover go out of bounds or clash', () => {
        it("exceeds grid coordinates", () => {
            checkNewRoverCoords('88 88 N', marsTestData)
            expect(mockPrompt).toHaveBeenCalledWith(invalidCoord, checkNewRoverCoords, marsTestData)
        });
        it("clashes with another rover", () => {
            checkNewRoverCoords('5 5 W', marsTestData)
            expect(mockPrompt).toHaveBeenCalledWith(invalidCoord, checkNewRoverCoords, marsTestData)
        });
    })

    describe('should call processNewRoverCoords() with expected args when passed valid coordinates', () => {
        it("trailing whitespace", () => {
            checkNewRoverCoords('8 8 N', marsTestData)
            expect(mockPrompt).not.toHaveBeenCalled()
            expect(processNewRoverCoords).toHaveBeenCalledWith({bearing: 'N', x: 8, y: 8}, marsTestData)
            expect(processNewRoverCoords).toHaveBeenCalledTimes(1)
        });
        it("trailing whitespace", () => {
            checkNewRoverCoords('2 4 S', marsTestData)
            expect(mockPrompt).not.toHaveBeenCalled()
            expect(processNewRoverCoords).toHaveBeenCalledWith({bearing: 'S', x: 2, y: 4}, marsTestData)
            expect(processNewRoverCoords).toHaveBeenCalledTimes(1)
        });
    })
});