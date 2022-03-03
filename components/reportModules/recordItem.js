
export default function RecordItem({record}) {
    return (
        <div>
            Item: {record.Title}<br/>
            Cost: {record.ItemTotal.value}
        </div>
    );
}
    