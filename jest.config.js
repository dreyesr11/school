module.exports = {
    roots: ['<rootDir>/'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    coverageThreshold: {
        global: {
            branches: 50,
            functions: 50,
            lines: 50,
            statements: 50
        }
    },
    coverageReporters: ['json', 'lcov', 'text', 'clover']
}
