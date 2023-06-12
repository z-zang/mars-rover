// todo: move to config file, see if i can make static array length
export const VALID_DIRECTIONS = ['N', 'E', 'S', 'W'] as const;
export type Direction = typeof VALID_DIRECTIONS[number];

// todo: tidy
export const isDirection = (x: any): Direction => {
	return VALID_DIRECTIONS.includes(x) ? x : false
};

export const VALID_INSTRUCTS = ['L', 'R', 'M'] as const;
export type Instruct = typeof VALID_INSTRUCTS[number];

export const VALID_ROTATIONS = ['L', 'R'] as const;
export type Rotation = typeof VALID_ROTATIONS[number];

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
	plateauCoords: {
		x: number,
		y: number
	}, 
	rovers: Rover[]
}

// export const marsRoverData: MarsRover = {
// 	plateauCoords: {
// 		x: 0,
// 		y: 0
// 	},
// 	rovers: [
// 		{
// 			name: 'rover-1',
// 			positionArr: [
// 				{x: 10, y: 10, bearing: 'N'},
// 				{x: 11, y: 11, bearing: 'N'},
// 				{x: 12, y: 12, bearing: 'S'}
// 			]
// 		},
// 		{
// 			name: 'rover-2',
// 			positionArr: [
// 				{x: 20, y: 20, bearing: 'N'},
// 				{x: 21, y: 21, bearing: 'N'},
// 				{x: 22, y: 22, bearing: 'S'}
// 			]
// 		},
// 	]
// }

// Actual
export const marsRoverData: MarsRover = {
	plateauCoords: {
		x: 0,
		y: 0
	},
	rovers: []
}
