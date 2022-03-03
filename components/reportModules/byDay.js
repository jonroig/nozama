
export default function ByDay({orderObj}) {
    const records = orderObj.byDay;
    return (
        <>
            <h3>By Day</h3>
            {Object.keys(records).map(year => (
                <div key={year}>
                    {year} {records[year].records.length} {records[year].total.value}
                </div>
            ))}
        </>
    );
}