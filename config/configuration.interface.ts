export interface IConfiguration {
    readonly app: IAppConfiguration;
    readonly swagger: ISwaggerConfiguration;
}

export interface ISwaggerConfiguration {
    readonly title: string;
    readonly scheme: 'http' | 'https';
    readonly description: string;
    readonly apiVersion: string | number;
    readonly enableAuth: boolean;
    readonly guiUri: string;
    readonly jsonUri: string;
}

export interface IAppConfiguration {
    readonly port: string | number;
}
