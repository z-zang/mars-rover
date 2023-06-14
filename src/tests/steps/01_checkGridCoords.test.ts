import * as ui from '../../ui/console';
import { default as msg } from '../../messages';
import { MarsRover } from '../../types';
import checkGridCoords from '../../steps/01_checkGridCoords';
import checkNewRoverCoords from '../../steps/02_checkNewRoverCoords';

const mockPrompt = jest.spyOn(ui, 'prompt').mockImplementation(() => {})

const marsRoverData: MarsRover = {
	gridCoords: {
		x: 0,
		y: 0
	},
	rovers: []
}

let failureArgs = [
    msg.checkGridCoords.invalidFormat,
    checkGridCoords, 
    marsRoverData
]

let successData1 = {
    gridCoords: {x: 10, y: 10},
    rovers: []
}

let successData2 = {
    gridCoords: {x: 384730, y: 398674},
    rovers: []
}

afterEach(() => {    
    jest.clearAllMocks();
});

describe("checkGridCoords function", () => {
    describe('should call prompt when passed incorrect string, with invalidFormat message, itself as fn(), and unmodified data', () => {
        it("alphabetic string", () => {
            checkGridCoords('asdfghjkl', marsRoverData)
            expect(mockPrompt).toHaveBeenCalledTimes(1)
            expect(mockPrompt).toHaveBeenCalledWith(...failureArgs)
        });
        it("numbers and other symbols", () => {
            checkGridCoords('1238$£(*^@3{]34234', marsRoverData)
            expect(mockPrompt).toHaveBeenCalledTimes(1)
            expect(mockPrompt).toHaveBeenCalledWith(...failureArgs)
        });
        it("incorrect amount of spaced numbers", () => {
            checkGridCoords('88 88 88', marsRoverData)
            expect(mockPrompt).toHaveBeenCalledTimes(1)
            expect(mockPrompt).toHaveBeenCalledWith(...failureArgs)
        });
        it("trailing whitespace", () => {
            checkGridCoords('88 88 ', marsRoverData)
            expect(mockPrompt).toHaveBeenCalledTimes(1)
            expect(mockPrompt).toHaveBeenCalledWith(...failureArgs)
        });
    })

    // Note: success is based on EXPECTED_NUM_OF_COORDS, set in config.
    // it's currently set to expect 2 coordinates
    describe('should call success prompt when passed correct string, with success message, itself as fn(), and modified data', () => {
        it("valid string", () => {
            checkGridCoords("10 10", marsRoverData)
            expect(mockPrompt).toHaveBeenCalledTimes(1)
            expect(mockPrompt).toHaveBeenCalledWith(
                msg.checkGridCoords.success,
                checkNewRoverCoords,
                successData1
            )
        });
        it("valid large number", () => {
            checkGridCoords('384730 398674', marsRoverData)
            expect(mockPrompt).toHaveBeenCalledTimes(1)
            expect(mockPrompt).toHaveBeenCalledWith(
                msg.checkGridCoords.success,
                checkNewRoverCoords,
                successData2
            )
        });
    })
});