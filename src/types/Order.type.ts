/* eslint-disable no-unused-vars */
enum orderStatus {
    active,
    complete,
}
type Order = {
    id?: number;
    userId: number;
    status: orderStatus;
};
export default Order;
export { orderStatus };
