
export default function ByCategory({orderObj}) {
    const records = orderObj.byCategory;
    return (
        <>
            <h3>By Cateogry</h3>
            {Object.keys(records).map(category => (
                <div key={category}>
                    {category} {records[category].records.length} {records[category].total.value}
                </div>
            ))}
        </>
    );
}