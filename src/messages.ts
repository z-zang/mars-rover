const messages = {
    marsRoverStart: {
        success: "Please enter the upper-right co-ordinates of the plateau, represented by 2 integers, eg: 5 5"
    },
    checkGridCoords: {
        success: "Valid co-ordinates received. For the rover, please enter: \n- the starting co-ordinates, represented by 2 integers \n- and the cardinal position it's facing, represented by either N | S | W | E. \nEg: 1 2 N",
        invalidFormat: "Invalid input detected. Please try again."
    },
    checkNewRoverCoords: {
        invalidFormat: "Invalid rover coords format. Please try again.",
        invalidCoord: "Invalid rover coords - rover is out of bounds, or clashes with another rover. \nPlease try again"
    },
    processRoverCoords: {
        success: "Valid co-ordinates received. For the rover, please enter: \n- the directions you would like it to travel in, represented by instructions L, R, or M.\nEg: LMLMLRMMMRMRMLMR",
    },
    checkRoverDirections: {
        invalidFormat: "Invalid rover direction input.\nPlease try again"
    },
    processRoverDirections: {
        addNewRover: "Valid co-ordinates received. For the next rover, please enter: \n- the starting co-ordinates.",
        failure: (reason: string) => `Rover instructions ${reason}. \nPlease try inputting directions again.`
    },
    processRoverInstruct: {
        invalidCoord: 'go out of grid bounds',
        roverClash: 'crash with another rover'
    },
    printFinalRoverData: {
        success: "Final rover output:"
    }
}

export default messages