module.exports = {
    entryPointStrategy: 'expand',
    entryPoints: [
        './source'
    ],
    name: 'mongo-cleaner - DEV',
    includeVersion: true,
    tsconfig: 'source/tsconfig.json',
    gaID: process.env.GA_TOKEN,
    out: './docs/documentation/html-dev'
};