import * as ui from '../../ui/console'
import { default as msg } from '../../messages';
import { MarsRover } from '../../types';
import marsRoverStart from '../../steps/00_marsRoverStart';
import checkGridCoords from '../../steps/01_checkGridCoords';

const mockPrompt = jest.spyOn(ui, 'prompt').mockImplementation(() => {})
const mockPrint = jest.spyOn(ui, 'print').mockImplementation(() => {})
const mockClear = jest.spyOn(ui, 'clear').mockImplementation(() => {})

const { success } = msg.marsRoverStart;

const marsTestData: MarsRover = {
	gridCoords: {
		x: 0,
		y: 0
	},
	rovers: []
}

describe('marsRoverStart function', () => {
    it("should call clear, print, and prompt with expected args", () => {
        marsRoverStart(marsTestData)
        expect(mockClear).toHaveBeenCalledTimes(1)
        expect(mockPrint).toHaveBeenCalledTimes(3)
        expect(mockPrompt).toHaveBeenCalledTimes(1)
        expect(mockPrompt).toHaveBeenCalledWith(success, checkGridCoords, marsTestData)
    })
})
