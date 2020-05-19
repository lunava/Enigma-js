/** Handler for errors.
 * @author Luis Navarrete Rios
 */
class EnigmaError extends Error {
    constructor(msg) {
        super(msg);
    }
    static error (msg, ...args) {
        return new EnigmaError('${msg}, ${args}');
    }
}