module.exports = function (w) {
    return {
        debug: true,

        files: [
            './src/**/*.ts'
        ],

        tests: [
            './test/**/*.spec.ts',
        ],

        env: {
            type: 'node',
            runner: 'node'
        },

        testFramework: 'jasmine',

        compilers: {
            '**/*.ts': w.compilers.typeScript({
                "target": "es6"
            })
        },

    };
};