# Mars rover project
## Description
A console application solution based on the Tech Returners specification of [this kata](https://kata-log.rocks/mars-rover-kata). Uses Typescript, Jest. 

## Setup
To set up this project locally after cloning the repo, please run:

```
npm install
```

and then
```
npm start
```

## Notes on key features, asssumptions, and approach.
- It's an interactive console application, which prompts retry if the user doesn't enter a valid input.
- `main.ts` runs the application, which is split up into individual functions and numbered by their position in the program in the /steps folder
- The console messages are extracted into a file, and so are easy to change/update.
- I've made the assumption that rovers can't be on the same space at the same time, so there are checks to make sure the rovers don't go out of bounds, or collide with each other - not just at their end co-ordinate, but on their way travelling there.
    - this is done by throwing an error, which is more performant than waiting the whole loop out.
- The rovers' positions are stored on initalisation, and after processing valid directions, without overwriting each the previous. For each rover you thus have an array of their positions, in case that is useful in a future version of the program.
- Rovers are saved with an associated name - this is based on their index in the array, but could be further customised with user input if desired.

### Future considerations:
- Features: save rover by name, in case future, want custom naming of rovers. In case a rover's position in the roverArray is likely to change, the name will have to be a UUID instead.
- Certain constants are stored in an array: amount of coords, and total number of rovers. There could be a situation where another coord is added (Eg: z index, if the rover has an extensible arm or something!), or if more than 2 rovers are going to be moved.
- It would be easy to add another function to allow re-movement of an existing rover :)

### Here are some technical aspects that gave me challenges, or I would like to consider further:
- I couldn't derive a regex from the string types for the `Position` or `Instruct` types. I think that's one of the biggest parts that's not extensible - if the requirements for the inputs change, the regex tests would have to be updated.
- I wasn't sure if should pass marsRoverData in to each function (for clean code) or if should just import it at top of each file
- I could be bit more descriptive with mock data names, or put mocks all into one file. maybe I would do for a larger project.
- I could improve the performance of processRoverInstruct: instead of processing each letter, I could split the string every it changes from a rotation to a movement, and then instead of incrementally adding 1 to the co-ordinates per movement, I could add movementArr.length to the correct co-ordinate. I would also have to update the checking process for clashing co-ordinates though.