import {Cell, Pie, PieChart, ResponsiveContainer, Sector} from 'recharts';
import {useState} from "react";

const DEFAULT_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const renderActiveShape = (props) => {
    if (!props || Object.keys(props).length === 0) return null;
    const RADIAN = Math.PI / 180;
    const {cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value} = props;
    const sin = Math.sin(-RADIAN * (midAngle ?? 1));
    const cos = Math.cos(-RADIAN * (midAngle ?? 1));
    const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
    const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
    const mx = (cx ?? 0) + ((outerRadius ?? 0) + 15) * cos;
    const my = (cy ?? 0) + ((outerRadius ?? 0) + 25) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 10;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} style={{fontSize: "15px"}}>
                {payload.name}
            </text>
            <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill}/>
            <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={(outerRadius ?? 0) + 6} outerRadius={(outerRadius ?? 0) + 10} fill={fill}/>
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" style={{fontSize: "17px"}}>{`${value} Produto(s)`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" style={{fontSize: "13px"}}>
                {`(Rate ${((percent ?? 1) * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const PieChartDispensa = ({productsList, colors, legendPosition = "right"}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const COLORS = colors || DEFAULT_COLORS;

    const onPieEnter = (_, index) => setActiveIndex(index);

    const totalByCategory = [];
    productsList.forEach(p => {
        totalByCategory[p.categoria] = (totalByCategory[p.categoria] ?? 0) + 1;
    });

    const data = Object.keys(totalByCategory).map(k => ({ name: k, value: totalByCategory[k] }));

    const chart = (
        <ResponsiveContainer width="100%" height={200}>
            <PieChart margin={{ top: 25, right: 5, bottom: 30, left: 5 }}>
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );

    const legendBottom = (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", justifyContent: "center", marginTop: "8px" }}>
            {data.map((entry, index) => (
                <div key={entry.name} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: COLORS[index % COLORS.length], flexShrink: 0 }}/>
                    <span style={{ fontSize: "12px", color: "#444" }}>{entry.name}</span>
                    <span style={{ fontSize: "12px", color: "#888", fontWeight: "600" }}>{entry.value}</span>
                </div>
            ))}
        </div>
    );

    const legendRight = (
        <div style={{ minWidth: "130px", paddingLeft: "4px" }}>
            {data.map((entry, index) => (
                <div key={entry.name} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <div style={{ width: "11px", height: "11px", borderRadius: "50%", background: COLORS[index % COLORS.length], flexShrink: 0 }}/>
                    <span style={{ fontSize: "12px", color: "#444", flex: 1 }}>{entry.name}</span>
                    <span style={{ fontSize: "12px", color: "#888", fontWeight: "600" }}>{entry.value}</span>
                </div>
            ))}
        </div>
    );

    if (legendPosition === "bottom") {
        return (
            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                {chart}
                {legendBottom}
            </div>
        );
    }

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ flex: 1, minWidth: 0 }}>{chart}</div>
            {legendRight}
        </div>
    );
};

export default PieChartDispensa;
