/** Main class for handling Enigma Emulation.
 * the arg are command-line inputs that are
 * 1 <= args.length <= 3
 * args[0] = configuration file
 * args[1] = input file [OPTIONAL]
 * args[2] = output file [OPTIONAL]
 * @author Luis Navarrete*/
const args = process.argv.slice(2);
let _config = null;
let _input = null;
let _output = null;
const fs = require('fs');
var pointer = 0;
const readLine = require('readline');
Main(args);

/** Main function for running this program.
 * @param args command-line args
 * @constructor
 */
function Main(args){
    validArgs(args);
    _config = getInput(args[0]);
    console.log(_config);
    if (args.length > 1) {
    }
}
/** returns a reading stream of this file name.
 * @param name of the file
 */
function getInput(name) {
    const data = fs.readFileSync(name, 'UTF-8');
    let lines = data.split(/\r?\n/);
    return lines;
}

/** Checks if args are conventional to our enigma machine.
 * @param args
 */
function validArgs(args) {
    if (args.length < 1 || args.length > 3 ) {
        console.error("Only 1, 2, or 3 command-line arguments allowed");
        process.exit(1);
    }
}


