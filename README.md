# Mars rover project

```
npm install
```

```
npm start to run
```

Future considerations:
- could add z-index, for height of arm
- name rovers (and store in object)
- option to move rovers again
- number input: choose base other than 10 (found when trying typeof Number('23a') === true)


- checks for rovers:
    - going out of bounds of the plateau
    - collisions with other rovers

- Features: save rover by name, in case future, want custom naming of rovers
- messages are extracted out and easy to change :) 
- save positions in an array, in case we want a tracking of all the places the rovers have been :D 
- throw error in process instruct - this prevents needing the entire loop to continue if there is an error (improves performance)

technical aspects I wish I had more time for:
- being able to derive a regex from the string types, or otherwise linking the valid strings to the regex i used to test the user inputs. I think that's one of the biggest parts that's not extensible