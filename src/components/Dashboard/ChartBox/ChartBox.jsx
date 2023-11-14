import { Link } from "react-router-dom";
import Styles from "./ChartBox.module.scss";
import classNames from "classnames";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

const ChartBox = (props) => {
  return (
    <div className={classNames(Styles.chartBox)}>
      <div className={classNames(Styles.boxInfo)}>
        <div className={classNames(Styles.title)}>
          <img src={props.icon} alt="" />
          <span>{props.title}</span>
        </div>
        <h1>{props.number}</h1>
        <Link to="/" style={{ color: props.color }}>
          View all
        </Link>
      </div>
      <div className={classNames(Styles.chartInfo)}>
        <div className={classNames(Styles.chart)}>
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 70 }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={classNames(Styles.texts)}>
          <span
            className={classNames(Styles.percentage)}
            style={{ color: props.percentage < 0 ? "tomato" : "limegreen" }}
          >
            {props.percentage}%
          </span>
          <span className={classNames(Styles.duration)}>this month</span>
        </div>
      </div>
    </div>
  );
};

export default ChartBox;
