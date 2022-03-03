
export default function ByYear({orderObj}) {
    const records = orderObj.year;
    return (
        <>
            <h3>By Year</h3>
            {Object.keys(records).map(year => (
                <div key={year}>
                    {year} {records[year].records.length} {records[year].total.value}
                </div>
            ))}
        </>
    );
}