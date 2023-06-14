import * as ui from '../../ui/console';
import { default as msg } from '../../messages';
import { Rover, MarsRover } from '../../types';
import processNewRoverCoords from '../../steps/03_processNewRoverCoords';
import checkRoverDirections from '../../steps/04_checkRoverDirections';

const mockPrompt = jest.spyOn(ui, 'prompt').mockImplementation(() => {})
jest.mock('../../steps/04_checkRoverDirections', () => jest.fn());

const { success } = msg.processRoverCoords;

const marsTestData1: MarsRover = {
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

const newRover1: Rover = {
    name: 'rover-2',
    positionArr: [
        {bearing: 'N', x: 8, y: 8}
    ]
}

const marsTestData2 = {...marsTestData1, rovers: [...marsTestData1.rovers, newRover1] }

const newRover2: Rover = {
    name: 'rover-3',
    positionArr: [
        {bearing: 'W', x: 3, y: 10}
    ]
}

afterEach(() => {    
    jest.clearAllMocks();
});

describe("processNewRoverCoords function", () => {
    describe('should call prompt() with expected args with modified rover data', () => {
        it("example 1", () => {
            processNewRoverCoords({bearing: 'N', x: 8, y: 8}, marsTestData1)
            expect(mockPrompt).toHaveBeenCalledTimes(1)
            expect(mockPrompt).toHaveBeenCalledWith(success, checkRoverDirections, newRover1.name, marsTestData2)
        })
        it("example 2", () => {

            processNewRoverCoords({bearing: 'W', x: 3, y: 10}, marsTestData2)
            expect(mockPrompt).toHaveBeenCalledTimes(1)
            expect(mockPrompt).toHaveBeenCalledWith(success, checkRoverDirections, newRover2.name, {...marsTestData1, rovers: [...marsTestData1.rovers, newRover2] })
        })
    })
});