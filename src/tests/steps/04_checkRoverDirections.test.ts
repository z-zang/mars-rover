import * as ui from '../../ui/console';
import { default as msg } from '../../messages';
import checkRoverDirections from '../../steps/04_checkRoverDirections';
import processRoverDirections from '../../steps/05_processRoverDirections';
import { MarsRover } from '../../types';

const mockPrompt = jest.spyOn(ui, 'prompt').mockImplementation(() => {})
jest.mock('../../steps/05_processRoverDirections', () => jest.fn());

const { invalidFormat } = msg.checkRoverDirections;

const marsTestData: MarsRover = {
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

describe("checkRoverDirections function", () => {
    describe('should call prompt() with expected args when passed invalid string, with invalidFormat message, itself as fn(), and unmodified data', () => {
        it("alphabetic string", () => {
            checkRoverDirections('asdfghjkl', marsTestData.rovers[0].name, marsTestData)
            expect(mockPrompt).toHaveBeenCalledTimes(1)
            expect(mockPrompt).toHaveBeenCalledWith(invalidFormat, checkRoverDirections, marsTestData.rovers[0].name, marsTestData)
        });
        it("numbers, whitespace, and other symbols", () => {
            checkRoverDirections(' 1238$£(*^@ 3{]342 34', marsTestData.rovers[0].name, marsTestData)
            expect(mockPrompt).toHaveBeenCalledTimes(1)
            expect(mockPrompt).toHaveBeenCalledWith(invalidFormat, checkRoverDirections, marsTestData.rovers[0].name, marsTestData)
        });
        it("lowercase", () => {
            checkRoverDirections('rmlmrlmlrrmmrlml', marsTestData.rovers[0].name, marsTestData)
            expect(mockPrompt).toHaveBeenCalledTimes(1)
            expect(mockPrompt).toHaveBeenCalledWith(invalidFormat, checkRoverDirections, marsTestData.rovers[0].name, marsTestData)
        });
    })

    describe('should call processRoverDirections() with expected args when passed valid string, with user input, rovername, and unmodified data', () => {
        it("example 1", () => {
            checkRoverDirections('LMLMRRMLRMLMRL', marsTestData.rovers[0].name, marsTestData)
            expect(mockPrompt).toHaveBeenCalledTimes(0)
            expect(processRoverDirections).toHaveBeenCalledTimes(1)
            expect(processRoverDirections).toHaveBeenCalledWith('LMLMRRMLRMLMRL', marsTestData.rovers[0].name, marsTestData)
        });
        it("example 2", () => {
            checkRoverDirections('MMMRMLMRRRRMRMLM', marsTestData.rovers[0].name, marsTestData)
            expect(mockPrompt).toHaveBeenCalledTimes(0)
            expect(processRoverDirections).toHaveBeenCalledTimes(1)
            expect(processRoverDirections).toHaveBeenCalledWith('MMMRMLMRRRRMRMLM', marsTestData.rovers[0].name, marsTestData)
        });
    })
});