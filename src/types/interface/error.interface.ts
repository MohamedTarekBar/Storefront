interface Error {
    name?: string;
    stack?: string;
    message?: string | unknown;
    status?: number;
}

export default Error;
