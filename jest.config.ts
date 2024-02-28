import type { Config } from 'jest'

const IS_GH_ACTIONS = process.env.GITHUB_ACTIONS === 'true'

const config: Config = {
    verbose: true,
    // seconds to be considered slow
    slowTestThreshold: 25,
    reporters: [
        IS_GH_ACTIONS ? ['github-actions', { silent: false }] : 'default',
        [
            'jest-junit',
            {
                suiteName: 'E2E Tests',
                output: './junit.xml',
                classNameTemplate: '{classname}',
                titleTemplate: '{title}',
                ancestorSeparator: ' =>> ',
                suiteNameTemplate: '{filepath}',
            },
        ],
        'summary',
        [
            'jest-html-reporters',
            {
                filename: 'jest-report.html',
                openReport: false,
                pageTitle: 'Thor E2E Tests',
            },
        ],
    ],
    // ms to wait before throwing a timeout error
    testTimeout: 35_000,
    json: true,
    maxWorkers: 10,
    setupFilesAfterEnv: ['./jest.setup.ts'],
}

export default config
