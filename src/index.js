const path = require('path');
const { run: jscodeshift } = require('jscodeshift/src/Runner');

const transformPath = path.join(__dirname, 'transform.js');

// node src/index.js path-to-migrate
const args = process.argv.slice(2);

if(args.length === 0) {
    console.error('Please provide a path for migration');
    process.exit(1);
}

const sourcePath = args[0];

const main = async () => {
    try {
        const result = await jscodeshift(
            transformPath,
            [sourcePath],
            {
                dry: false,
                verbose: 2,
                print: false,
                babel: true,
                extensions: 'js',
                parser: 'flow'
            }
        )
        console.log('Migration completed');
        console.dir(result);
    }
    catch(error) {
        console.error('Migration failed');
        console.dir(error);
    }
}

main();