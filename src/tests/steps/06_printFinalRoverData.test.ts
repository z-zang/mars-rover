import * as ui from '../../ui/console';
import printFinalRoverData from '../../steps/06_printFinalRoverData';
import { MarsRover } from '../../types';

const mockPrint = jest.spyOn(ui, 'print').mockImplementation(() => {})
const mockClear = jest.spyOn(ui, 'clear').mockImplementation(() => {})
jest.spyOn(process, 'exit').mockImplementation(() => { throw new Error('process.exit'); });

afterEach(() => {    
    jest.clearAllMocks();
});

describe("printFinalRoverData function", () => {
    const marsRoverData1: MarsRover = {
        gridCoords: { x: 10, y: 10 },
        rovers: [
            {
                name: 'rover1',
                positionArr: [
                    { bearing: 'S', x: 8, y: 6 },
                    { bearing: 'S', x: 3, y: 4 }
                ]
            },
            {
                name: 'rover2',
                positionArr: [
                    { bearing: 'E', x: 3, y: 3 },
                    { bearing: 'W', x: 7, y: 8 }
                ]
            },
        ]
    }
    const marsRoverData2: MarsRover = {
        gridCoords: { x: 10, y: 10 },
        rovers: [
            {
                name: 'rover1',
                positionArr: [
                    { bearing: 'S', x: 8, y: 6 },
                    { bearing: 'S', x: 3, y: 4 }
                ]
            },
            {
                name: 'rover2',
                positionArr: [
                    { bearing: 'E', x: 3, y: 3 },
                    { bearing: 'W', x: 7, y: 8 }
                ]
            },
            {
                name: 'rover3',
                positionArr: [
                    { bearing: 'E', x: 3, y: 3 },
                    { bearing: 'W', x: 7, y: 8 }
                ]
            },
            {
                name: 'rover4',
                positionArr: [
                    { bearing: 'E', x: 3, y: 3 },
                    { bearing: 'W', x: 7, y: 8 }
                ]
            },
            {
                name: 'rover5',
                positionArr: [
                    { bearing: 'E', x: 3, y: 3 },
                    { bearing: 'W', x: 7, y: 8 }
                ]
            },
        ]
    }
    
    const expectedNumPrintCalls = 
    describe("should call clear, print, and call process.exit", () => {
        it('example 1', () => {
            expect(() => printFinalRoverData(marsRoverData1)).toThrow('process.exit')
            expect(mockClear).toHaveBeenCalledTimes(1)
            expect(mockPrint).toHaveBeenCalledTimes(marsRoverData1.rovers.length + 1)
        })
        it('example 2', () => {
            expect(() => printFinalRoverData(marsRoverData2)).toThrow('process.exit')
            expect(mockClear).toHaveBeenCalledTimes(1)
            expect(mockPrint).toHaveBeenCalledTimes(marsRoverData2.rovers.length + 1)
        })

    });
});