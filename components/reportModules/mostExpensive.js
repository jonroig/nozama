import RecordItem from "./recordItem";

export default function MostExpensive({orderObj}) {
    return (
        <div>
            <h3>Most Expensive</h3>
            <RecordItem record={orderObj.mostExpensive} />
        </div>
    );
}