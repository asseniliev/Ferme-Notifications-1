import { useSelector } from "react-redux";

export default function getTotal() {
    const total = useSelector((state) => state.productCounter.value.reduce((tot, product) => tot + (product.price * product.quantity), 0))
    return total
}
