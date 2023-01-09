export interface success {
    status: number;
    message: string;
    data: unknown;
}

export default function successResponse(options?: Partial<success>): success {
    const defaults = {
        status: 200,
        message: 'success',
        data: {},
    };

    return {
        ...defaults,
        ...options,
    };
}
