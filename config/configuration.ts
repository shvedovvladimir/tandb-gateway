import { IConfiguration } from './configuration.interface';

// tslint:disable-next-line: no-default-export
export default (): IConfiguration => ({
    app: {
        port: process.env.APP_PORT || 9080,
    },
    swagger: {
        scheme: process.env.SWAGGER_SCHEME as ESchemeType || 'http',
        title: process.env.SWAGGER_TITLE,
        description: process.env.SWAGGER_DESCRIPTION,
        apiVersion: 1,
        enableAuth: Boolean(process.env.SWAGGER_AUTH_ENABLED),
        guiUri: process.env.SWAGGER_GUI_URI,
        jsonUri: process.env.SWAGGER_JSON_URI,
    },
    logger: {
        level: process.env.LOG_LEVEL || 'DEBUG',
        printStackTrace: true,
        format: {
            separator: '\n',
        },
    },
    microservicesProxy: {
        tandbAuth: {
            microserviceUrl: process.env.TANDB_AUTH_URL,
        },
        tandbVote: {
            microserviceUrl: process.env.TANDB_VOTE_URL,
        },
    },
});

enum ESchemeType {
    http = 'http',
    https = 'https',
}
