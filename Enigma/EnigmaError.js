/** Handler for errors.
 * @author Luis Navarrete Rios
 */
class EnigmaError extends Error {
    constructor(msg) {
        super(msg);
    }
    static error(msg, ...args) {
        throw new EnigmaError(msg,  args);
    }
}
exports.EnigmaError = EnigmaError;