/** Handler for errors.
 * @author Luis Navarrete Rios
 */
class EnigmaError extends Error {
    constructor(msg) {
        super(msg);
    }
    static error(msg, ...args) {
        console.error(msg + args);
        process.exit(1)
    }
}
exports.EnigmaError = EnigmaError;