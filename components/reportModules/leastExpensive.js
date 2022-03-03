import RecordItem from "./recordItem";

export default function LeastExpensive({orderObj}) {
    return (
        <div>
            <h3>Least Expensive</h3>
            <RecordItem record={orderObj.leastExpensive} />
        </div>
    );
}