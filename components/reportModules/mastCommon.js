export default function MostCommon({orderObj}) {
    const tmpRecords = orderObj.mostCommon.slice(0, 10);
    
    return (
        <>
            <h3>Most Common</h3>
            {tmpRecords.map(record => (
                <div key={`mostCommon_${record.ASINISBN}`}>
                    {record.count} {record.Title}
                </div>
            ))}
        </>
    );
}