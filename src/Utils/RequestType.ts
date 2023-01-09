import { Request } from 'express';

const getData = (o: Request) => {
    if (Object.keys(o.query).length > 0) {
        return o.query;
    }
    if (Object.keys(o.body).length > 0) {
        return o.body;
    }
    if (Object.keys(o.params).length > 0) {
        return o.params;
    }
    return undefined;
};

export default getData;
