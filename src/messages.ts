const messages = {
    marsRoverStart: {
        success: "Please enter the upper-right co-ordinates of the plateau, represented by 2 integers, eg: 5 5"
    },
    checkGridCoordinates: {
        succcess: "Valid co-ordinates received. For the first rover, please enter: \n- the starting co-ordinates, represented by 2 integers \n- and the cardinal position it's facing, represented by either N | S | W | E. \nEg: 1 2 N",
        failure: "Invalid input detected. Please try again."
    },
    checkRoverCoordinates: {
        failure: "Invalid rover coords format. Please try again."
    },
    processRoverCoordinates: {
        success: "Valid co-ordinates received. For the first rover, please enter: \n- the directions you would like it to travel in, represented by instructions L, R, or M.\nEg: LMLMLRMMMRMRMLMR",
        failure: "Invalid rover coords - rover is out of bounds, or clashes with another rover. \nPlease try again"
    },
    checkRoverDirections: {
        success: '',
        failure: "Invalid rover direction input.\nPlease try again"
    },
    processRoverDirections: {
        success: "Valid co-ordinates received. For the next rover, please enter: \n- the starting co-ordinates.",
        failure: "Rover instructions either go out of bounds or clash with another rover. \nPlease try inputting directions again."
    },
    processRoverInstruct: {
        error: 'Error: FAILED - ROVER OUT OF BOUNDS, OR CLASHES WITH ANOTHER ROVER'
    },
    printFinalRoverData: {
        success: "Final rover output:"
    }
}

export default messages