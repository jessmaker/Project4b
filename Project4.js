/**
 *   @author Essmaker, Jo'Anne (joannessmaker@gmail.com)
 *   @summary Project 4 || created: 10/15/2017
 */

"use strict";
const PROMPT = require('readline-sync');
const IO = require(`fs`);


let continueResponse;
let movieRating, menuChoice, numMovies, totalRatingAverage, numberOfRatings;
let movieTitle;
let movies = [], ratings = [];

function main() {
    process.stdout.write('\x1Bc');
    setContinueResponse();
    while (continueResponse === 1) {
        setMenuChoice();
        setMovieTitle();
        setMovieRating();
        populateMovies();
        insertIntoArray();
        writeMovies();
        setContinueResponse();
    }
    printMovies();
}

main();

/**
 * @method setContinueResponse
 * @desc Continue Response Mutator
 * @returns
 */
function setContinueResponse() {
    if (continueResponse = null) {
        continueResponse = 1;
        while (continueResponse !== 0 && continueResponse !== 1) {
            continueResponse = Number(PROMPT.question(`\nDo you want to continue? [0=no, 1=yes]: `))
        }
    } else {
        continueResponse = 1;
    }
}

/**
 * @method setMenuChoice
 * @desc Menu Choice Mutator
 * @returns {null}
 */
 function setMenuChoice()    {
    menuChoice = -1;
    while (menuChoice !== 1 && menuChoice !== 2 && menuChoice !== 3 && menuChoice!== 4 && menuChoice !== 5) {
        menuChoice = Number(PROMPT.question(
            `\tPlease Select the Movie You Would Like to Enter a Rating for...
            \t\t1) The Heat
            \t\t2) Shrek
            \t\t3) Texas Chainsaw Masacre
            \t\t4) I would like to enter my own title to be rated
            \t\t5) EXIT
            \t\tCHOOSE: `
        ));
        if (menuChoice < 1 || menuChoice > 5) {
            console.log(`\n\tI'M SORRY, PLEASE TRY AGAIN. `);
        }
    }
}

/**@method setMovieTitle
 * @desc Movie Title Mutator
 * @returns
 */
function setMovieTitle() {
    if (menuChoice === 4) {
        movieTitle = PROMPT.question(`\nPlease enter the title of the movie you would like to rate... `);
    }
}

/**
 * @method
 * @desc movies MD array mutator
 * @returns (null)
 */
function populateMovies() {
    const MIN_RATING = 0, MAX_RATING = 5;
    for (let i = 0; i < numMovies; i++) {
        movies[i] = [];
        console.log(`\nMovie ${i + 1};`);
        while (! movies[i][0] || !/^[a-ZA-Z -]{1,30}$/.test(movies[i][0])) {
            movies[i][0] = PROMPT.question(`Please enter Movie Title: `);
            if (! /^[a-zA-Z -]{1,30}$/.test(movies[i][0])) {
                console.log(`${movies[i][0]} is invalid. Please try again.`);
            }
        }
        while (! movies[i][1] || movies[i][1] < MIN_RATING || movies[i][1] > MAX_RATING) {
            movies[i][1] = PROMPT.question(`Please enter rating (0-5): `);
            if (movies[i][1] < MIN_RATING || movies[i][1] > MAX_RATING) {
                console.log((`$(movies[i][1]} is invalid.  Please try again.`));
            }
        }
    }
}

/**
 * @method setMovieRating
 * @desc Movie Rating Mutator
 * @returns
*/

function setMovieRating() {
    movieRating = -1;
        if (menuChoice === 1) {
            Number(PROMPT.question(`\tWhat would you rate "The Heat" on a scale from 1-5:  `));
        }
            if (menuChoice === 2) {
                Number(PROMPT.question(`\tWhat would you rate "Shrek" on a scale from 1-5:  `));
            }
                if (menuChoice === 3) {
                    Number(PROMPT.question(`\tWhat would you rate "Texas Chainsaw Masacre" on a scale from 1-5:  `));
                }
                    if (menuChoice === 4) {
                        Number(PROMPT.question(`\nWhat would you rate "${movieTitle}" on a scale from 1-5:  `));
                    }
    else if (movieRating < 0 || movieRating > 5)   {
            console.log(`\tI'M SORRY, PLEASE RATE THIS MOVIE FROM 1-5 STARS. PLEASE TRY AGAIN. `);
    }
}


function insertIntoArray() {
    insertIntoArray = (newMovie); {
    let newMovie = movies.length;
    const COLUMNS = 2, MOVIE_TITLE = 0;
    for (let i = 0; i < COLUMNS; i++) {
        let finished = 0;
        if (i === MOVIE_TITLE) {
            while (finished !== 1 || typeof movies[movieTitle][i] === 'undefined' || !/^[a-zA-Z0-9 ]{1,30}$/.test(movies[movieTitle][i])) {
                movies[movieTitle][i] = (PROMPT.question(`\nPlease enter Movie Title: `));
                if (/^[a-zA-Z0-9 ]{1,30}$/.test(movies[movieTitle][i])) {
                    finished = 1;
                } else {
                    console.log(`WRONG!  ${movies[movieTitle][i]}`);
                }
            }
        } else {
            const MIN_RATING = 0, MAX_RATING = 5;
            while (finished !== 1 || typeof movies[movieTitle][i] === 'undefined' || isNaN(movies[movieTitle][i]) || movies[movieTitle][i] < MIN_RATING || movies[movieTitle][i] > MAX_RATING) {
                movies[movieTitle][i] = Number(PROMPT.question(`\nPlease enter Movie Rating: `));
                if (! isNaN(movies[movieTitle][i]) || movies[movieTitle][i] < MIN_RATING || movies[movieTitle][i] > MAX_RATING) {
                    finished = 1;
                }
            }
        }
    }
}

/**
 * @Method
 * @desc Print Movies Mutator
 * @returns
 */
function printMovies() {
    const COLUMNS = 3;
    for (let i = 0; i < movies.length; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            console.log(movies[i][j]);
        }
    }
}

/**
 * @method
 * @desc Print GoodBye Mutator
 * @returns
 */
function printGoodbye() {
    if (menuChoice === 5) {
        console.log(`\nThank You! Goodbye.`);
    }
}

/**
 * @method
 * @desc File IO Populate Movies Mutator
 * @returns
 */
function populateMovies() {
    let fileContents = IO.readFileSync(`data.csv`, 'utf8');
    let lines = fileContents.toString().split(/\r?\n/); // Automatically creates SD array on newlines
    for (let i = 0; i < lines.length; i++) {
        movies.push(lines[i].toString().split(/,/));
    }
}

/**
 * @method
 * @desc File IO Write Mutator
 * @returns
 */
function writeMovies() {
    const COLUMNS = 6;
    for (let i = 0; i < movies.length; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            if (j < COLUMNS - 1) {
                IO.appendFileSync(`dataX.csv`, `${people[i][j]},`, 'utf8');
            } else {
                IO.appendFileSync(`dataX.csv`, people[i][j], 'utf8');
            }
        }
        IO.appendFileSync(`dataX.csv`, "\n", 'utf8');
}


/*
Movie Kiosk:  Re-factor your code to run a kiosk at a movie theater. Program should loop infinitely to allow users
to either see average rating of previous user entries, or enter their own review.
Requirements:
•	Should store movie title, current user rating, total rating, and number of ratings
•	Should display a list of movies for user to review or option to review a new one
•	Should allow user to select a movie to see average rating
*/

/* PROJECT COMPLETION
1) CREATING JSDOC OUT FILE... IN TERMINAL WINDOW > TYPE jsdoc (name of code file) > ENTER > REFRESH PROJECT TO SEE NEW FOLDER CALLED "OUT" IN THE LEFT WINDOW
2) JSDOC URL... CLICK ON THE "OUT" FILE > DOUBLE CLICK ON INDEX.HTML FILE > HOVER OVER WINDOW > CLICK ON BROWSER > COPY/PASTE URL TO SHARE
3) CREATE GIT REPOSITORY... VCS > IMPORT INTO VERSION CONTROL > CREATE GIT REPOSITORY (SHOULD DEFAUT TO CORRECT FILE LOCATION) > CLICK OK (FILES ON LEFT TURN RED)
   > CLICK ON PARENT DIRECTORY > RIGHT CLICK > GIT > ADD > (ALL FILES SHOULD TURN GREEN)
4) PUSH PROJECT UP TO GITHUB... VCS > IMPORT INTO VERSION CONTROL > SHARE PROJECT ON GITHUB > DOUBLE CHECK NAME > ORIGON IS OK > ENTER DESCRIPTION > CLICK SHARE
   > (MAKE SURE WINDOW STATES "INTIAL COMMIT" AND ALL BOXES ARE CHECKED) > CLICK OK
5) DOUBLE CHECK GIT HUB REPOSITORY...YOU SHOULD SEE PROJECT AND ALL FILES THAT WERE PUSHED UP TO GITHUB
*/