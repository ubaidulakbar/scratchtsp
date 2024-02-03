const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');

const icon = "";

class Scratch3NewBlocks {
    constructor (runtime) {
        this.runtime = runtime;
    }

    getInfo () {
        return {
            id: 'newblocks',
            name: 'New Blocks',

            colour: '#01003a',
            colourSecondary: '#0f0961',
            colourTertiary: '#1664c9',
            blockIconURI: icon,

            blocks: [
                {
                    opcode: 'writeLog',
                    blockType: BlockType.COMMAND,
                    text: 'Run [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "LIST"
                        }
                    }
                }
            ]
        };
    }
    writeLog (args) {
        const text = Cast.toString(args.TEXT);
        log.log(text);
    }
}

module.exports = Scratch3NewBlocks;