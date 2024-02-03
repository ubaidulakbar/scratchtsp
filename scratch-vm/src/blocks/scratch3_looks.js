const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');

class Scratch3NewBlocks {
    constructor (runtime) {
        this.runtime = runtime;
        this.runtime.on(Scratch3LooksBlocks.SAY_OR_THINK)
    }

    getInfo () {
        return {
            id: 'newblocks',
            name: 'New Blocks',
            blocks: [
                {
                    opcode: 'writeLog',
                    blockType: BlockType.COMMAND,
                    text: 'log [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "hello"
                        }
                    }
                }
            ],
            looks_say: this.say
        };
    }
    static get SAY_OR_THINK () {
        // There are currently many places in the codebase which explicitly refer to this event by the string 'SAY',
        // so keep this as the string 'SAY' for now rather than changing it to 'SAY_OR_THINK' and breaking things.
        return 'SAY';
    }
    // writeLog (args) {
    //     const text = Cast.toString(args.TEXT);
    //     log.log(text);
    // }
    say (args, util) {
        // @TODO in 2.0 calling say/think resets the right/left bias of the bubble
        this.runtime.emit(Scratch3LooksBlocks.SAY_OR_THINK, util.target, 'say', args.MESSAGE);
    }
}

module.exports = Scratch3NewBlocks;