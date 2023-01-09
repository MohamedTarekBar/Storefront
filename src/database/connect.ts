import client from './database';
export default new (class Connect {
    async result(query: string, options?: unknown[] | undefined) {
        try {
            const connection = await client.connect();
            const result = await connection.query(query, options);
            connection.release();
            return result;
        } catch (error) {
            throw new Error(`${error as Error} /database`);
        }
    }
})();
