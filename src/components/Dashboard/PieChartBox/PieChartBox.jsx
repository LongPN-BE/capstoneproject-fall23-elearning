import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Styles from "./PieChartBox.module.scss";
import classNames from "classnames";

const PieChartBox = ({ data }) => {
  return (
    <div className={classNames(Styles.pieChartBox)}>
      <h3>Tổng số đánh giá</h3>
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
