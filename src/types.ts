// todo: move to config file, see if i can make static array length
export const VALID_INSTRUCTS = ['L', 'R', 'M'] as const;
export type Instruct = typeof VALID_INSTRUCTS[number];

export const VALID_ROTATIONS = ['L', 'R'] as const;
export type Rotation = typeof VALID_ROTATIONS[number];

export const VALID_DIRECTIONS = ['N', 'E', 'S', 'W'] as const;
export type Direction = typeof VALID_DIRECTIONS[number];

// Todo: not sure about this one! typescript was complaining so I had to include a manual type checker
export const isDirection = (x: any): Direction => {
	return VALID_DIRECTIONS.includes(x) ? x : false
};

export type Position = {
	x: number,
	y: number,
	bearing: Direction
}

export type Coords = {
    x: number,
	y: number,
}

export type Rover = {
	name: string,
	positionArr: Position[]
}

export type MarsRover  = {
	gridCoords: {
		x: number,
		y: number
	}, 
	rovers: Rover[]
}

// Initial program data.
export const marsRoverData: MarsRover = {
	gridCoords: {
		x: 0,
		y: 0
	},
	rovers: []
}
