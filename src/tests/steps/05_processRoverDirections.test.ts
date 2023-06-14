import * as ui from '../../ui/console';
import { default as msg } from '../../messages';
import { Rover, MarsRover, Position } from '../../types';
import processRoverDirections from '../../steps/05_processRoverDirections';
import checkNewRoverCoords from '../../steps/02_checkNewRoverCoords';
import printFinalRoverData from '../../steps/06_printFinalRoverData';
import checkRoverDirections from '../../steps/04_checkRoverDirections';
import * as utils from '../../utils/utils';

const mockPrompt = jest.spyOn(ui, 'prompt').mockImplementation(() => {})
const mockProcessRoverInstruct = jest.spyOn(utils, 'processRoverInstruct')
jest.mock('../../steps/06_printFinalRoverData', () => jest.fn());

const { addNewRover, failure } = msg.processRoverDirections;

const marsTestData: MarsRover = {
	gridCoords: {
		x: 10,
		y: 10
	},
    rovers: []
}

const rover1: Rover = {
    name: 'rover-1',
    positionArr: [
        { bearing: 'N', x: 5, y: 5 },
    ]
}

const mockRoverTestReturn: Position = { bearing: 'S', x: 3, y: 4}

let roverTest: Rover = { name: '', positionArr: [] }
let roverTestAfter: Rover = { name: '', positionArr: [] }

beforeEach(() => {
    roverTest = {
        name: 'rover-test',
        positionArr: [
            { bearing: 'S', x: 8, y: 8 }
        ]
    }
    roverTestAfter = {...roverTest, positionArr: [...roverTest.positionArr, mockRoverTestReturn]}
});

afterEach(() => {    
    jest.clearAllMocks();
});

describe("processRoverDirections function", () => {
    it('should call prompt() when amount of rovers is less than maximum, with expected args: invalidFormat message, itself as fn(), and unmodified data', () => {
        mockProcessRoverInstruct.mockImplementationOnce(() => mockRoverTestReturn)
        
        processRoverDirections('validString', roverTest.name, {...marsTestData, rovers: [roverTest]})
        expect(mockPrompt).toHaveBeenCalledTimes(1)
        expect(mockPrompt).toHaveBeenCalledWith(addNewRover, checkNewRoverCoords, {...marsTestData, rovers: [roverTestAfter]})
    })
    it('should call printFinalRoverData() when amount of rovers equal to maximum, with expected args: marsRoverdata', () => {
        mockProcessRoverInstruct.mockImplementationOnce(() => mockRoverTestReturn)
        
        processRoverDirections('validString', roverTest.name, {...marsTestData, rovers: [rover1, roverTest]})
        expect(mockPrompt).toHaveBeenCalledTimes(0)
        expect(printFinalRoverData).toHaveBeenCalledTimes(1)
        expect(printFinalRoverData).toHaveBeenCalledWith({...marsTestData, rovers: [rover1, roverTestAfter]})
    })
    it("should call prompt with error text, when error is thrown from processRoverInstruct, with expected args & unmodified data", () => {
        const processRoverInstructError = 'processRoverInstruct error message'
        const expectedText = failure(processRoverInstructError)
        mockProcessRoverInstruct.mockImplementationOnce(() => { throw new Error(processRoverInstructError)})

        processRoverDirections('validStringThatCausesCoordIssue', roverTest.name, {...marsTestData, rovers: [roverTest]})
        expect(mockPrompt).toHaveBeenCalledTimes(1)
        expect(mockPrompt).toHaveBeenCalledWith(expectedText, checkRoverDirections, roverTest.name, {...marsTestData, rovers: [roverTest]})
    });
});