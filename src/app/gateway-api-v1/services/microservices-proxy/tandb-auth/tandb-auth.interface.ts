export interface ITandbAuthProxyService {
    getTokenByProvidedCredentials(providedCredentials: IProvidedCredentials): Promise<ITokenResponse>;
    addAccessKey(accessKey: string): Promise<IAccessKeyResponse>;
    getAccessKeyIdByToken(token: string): Promise<IAccessKeyIdResponse>;
}

export interface IProvidedCredentials {
    accessKey: string;
}

export interface ITokenResponse {
    accessToken: string;
}

export interface IAccessKeyResponse {
    accessKey: string;
}

export interface IAccessKeyIdResponse {
    accessKeyId: number;
}
