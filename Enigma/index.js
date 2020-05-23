/** Main class for handling Enigma Emulation.
 * the arg are command-line inputs that are
 * 1 <= args.length <= 3
 * args[0] = configuration file
 * args[1] = input file [OPTIONAL]
 * args[2] = output file [OPTIONAL]
 * @author Luis Navarrete*/
const args = process.argv.slice(2);
const a = require('./Alphabet');
const m = require('./Machine');
const r = require('./Reflector');
const nm = require('./FixedRotor');
const mr = require('./MovingRotor');
const p = require('./Permutation');
const e = require('./EnigmaError');
let _config = null;
let _input = null;
let _output = null;
let machine = null;
let alphabetChars = '';
let alphabet = null;
let allRotors = [];
let numRotors = 0;
const fs = require('fs');
Main(args);

/** Main function for running this program.
 * @param args command-line args
 * @constructor
 */
function Main(args){
    validArgs(args);
    _config = getInput(args[0]);
    if (args.length > 1) {
        _input = getInput(args[1]);
    }
    if (args.length > 2) {
        _output = args[2]
    }
    processMachine();
}

/**Configure an Enigma machine from the contents of configuration
 *
 */
function processMachine() {
    let firstSen;
    if (_input.length > 0) {
        firstSen = _input[0];
        if (firstSen == '') {
            _input = _input.slice(1);
            console.log('');
            processMachine();
            return;
        }
        if (firstSen[0] == '*') {
            if (machine == null) {
                machine = readConfig();
            }
            setUp(machine, firstSen.substring(2));
            _input = _input.slice(1);
            while (_input[0] == '') {
                console.log('')
                _input = _input.slice(1);
            }
            let allMessage = [];
            let curr = '';
            curr = _input[0];
            while (curr != '' && curr[0] != '*') {
                 allMessage.push(curr);
                 if (_input.length < 2) {
                     break;
                 }
                 _input = _input.slice(1);
                 curr = _input[0];
            }
            for (let line of allMessage) {
                printMessageLine(line);
            }
            processMachine();
        } else {
            if (machine == null || _input.length > 1) {
                throw e.EnigmaError.error("require settings");
            }
            while (_input.length >= 1 && _input[0] == '') {
                console.log('')
                _input = _input.slice(1);
            }
        }
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

/** Reads the configurations file for creating an Enigma Machine.
 * @returns {Machine}
 */
function readConfig() {
    let pawls = 0;
    alphabetChars = _config[0];
    alphabet = new a.Alphabet(alphabetChars);
    let rotorArgs = _config[1].replace(/ /g,'');
    numRotors = rotorArgs[0];
    pawls = rotorArgs[1];
    let temp = [];
    for (let i = 2; i < _config.length; i += 1) {
        let config =  _config[i];
        let params = config.split(' ').filter((x) => x != '');
        temp = temp.concat(params);
        let first = temp[0];
        if (!surrounded(first)) {
            if (i < _config.length -1) {
                if (surrounded(_config[i + 1].trim().split(' ')[0])) {
                    continue;
                }
            }
            let rotor = readRotor(temp);
            allRotors.push(rotor);
            temp.length = 0;
        }else if (i + 1 < _config.length) {
            let cont = _config[i + 1];
            temp = temp.concat(cont);
            temp.length = 0;
        }
    }
    return new m.Machine(alphabet, numRotors, pawls, allRotors);
}

/** Creates a rotor based on the config
 * @param config parameters for rotor (type, name and notches)
 * @returns {MovingRotor|Reflector|FixedRotor}
 */
function readRotor(config) {
        let notches = '';
        let rotor = null;
        const name = config[0];
        const settingAndType = config[1];
        let cycles = [];
        for (let cycle of config.slice(2)) {
            cycles.push(cycle);
        }
        let cycleString = cycles.join(' ');
        let rotorType = settingAndType[0];
        if (settingAndType.length > 1) {
            notches = settingAndType.substring(1);
        }
        let perm = new p.Permutation(cycleString, alphabet);
        if (rotorType == 'M') {
            rotor = new mr.MovingRotor(name, perm, notches);
        } else if (rotorType == 'N') {
            rotor = new nm.FixedRotor(name, perm);
        } else if (rotorType == 'R') {
            rotor = new r.Reflector(name, perm);
        } else {
            throw e.EnigmaError.error('Invalid input');
        }
        return rotor;
}

/** Sets up the machine and the active rotors to be used for converting message.
 * @param machine
 * @param settings
 */
function setUp(machine, settings) {
    let sets = settings.split(' ');
    let plugboardCycle = [];
    let ringSetting = '';
    let activeRotors = sets.slice(0, numRotors);
    if (sets.length <= numRotors) {
        throw e.EnigmaError.error('Wrong settings for rotors');
    }
    if (sets.length > numRotors) {
        for (let i = numRotors + 1; i < sets.length; i +=1) {
            if (surrounded(sets[i])) {
                plugboardCycle.push(sets[i]);
            } else if (sets[i].length == numRotors - 1) {
                ringSetting = sets[i];
            }
        }
    }

    let rotorSettings = sets[numRotors];
    machine.insertRotors(activeRotors);
    machine.setRotors(rotorSettings);
    if (ringSetting != '') {
        machine.setRingSetting(ringSetting);
    }
    if (plugboardCycle.length != 0) {
        let cycle = plugboardCycle.join(' ');
        let plugboard = new p.Permutation(cycle, alphabet);
        machine.setPlugboard(plugboard);
    }
}
/** returns a reading stream of the output.
 * @param name of file
 */
function getOutput(name) {

}

/**Converts the line message based on the specifications on the machine
 * prints converted line
 * @param line to convert in machine
 */
function printMessageLine(line) {
    let arr = line.trim().split(' ');
    let split = splitMsg(arr.join(''));
    console.log(machine.convertMsg(split.join(' ')));
}

/** Splits line in sets of 5 characters per word.
 * @param msg String
 * @returns {[]}
 */
function splitMsg(msg) {
    let p = [];
    for (let i = 0; i < msg.length; i +=5) {
        p.push(msg.substring(i, Math.min(msg.length, i + 5)));
    }
    return p;
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

/** Checks if word is surrounded by parenthesis.
 * @param word String
 * @returns {returns true if word is surrounded by parenthesis}
 */
function surrounded(word) {
    if (word[0] == '(' && word[word.length - 1] == ')') {
        return true;
    }
    return false;
}


