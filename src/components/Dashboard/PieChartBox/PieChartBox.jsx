import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Styles from "./PieChartBox.module.scss";
import classNames from "classnames";

const data = [
  { name: "5 Star", value: 600, color: "#0088FE" },
  { name: "4 Star", value: 300, color: "#00C49F" },
  { name: "3 Star", value: 100, color: "#FFBB28" },
  { name: "2 Star", value: 50, color: "#FF8042" },
  { name: "1 Star", value: 10, color: "#2d3436" },
];

const PieChartBox = () => {
  return (
    <div className={classNames(Styles.pieChartBox)}>
      <h1>TOTAL FEEDBACK</h1>
      <div className={classNames(Styles.chart)}>
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={data}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className={classNames(Styles.options)}>
        {data.map((item) => (
          <div className={classNames(Styles.option)} key={item.name}>
            <div className={classNames(Styles.title)}>
              <div
                className={classNames(Styles.dot)}
                style={{ backgroundColor: item.color }}
              />
              <span>{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
