import React from "react";
import Styles from "./Dashboard.module.scss";
import classNames from "classnames";

import Navbar from "../../components/Dashboard/Navbar/Navbar";
import TopBox from "../../components/Dashboard/TopBox/TopBox";
import ChartBox from "../../components/Dashboard/ChartBox/ChartBox";
import BigChartBox from "../../components/Dashboard/BigChartBox/BigChartBox";
import BarChartBox from "../../components/Dashboard/BarChartBox/BarChartBox";

//data
import {
  chartBoxUser,
  topDealUsers,
  chartBoxCourse,
  chartBoxRevenue,
  chartBoxConversion,
  barChartBoxRevenue,
  barChartBoxVisit,
} from "../../mock/mock-data";
import PieChartBox from "../../components/Dashboard/PieChartBox/PieChartBox";

const Dashboard = () => {
  return (
    <>
      <div className={classNames(Styles.main)}>
        <Navbar />
        <div className={classNames(Styles.container)}>
          <div className={classNames(Styles.contentContainer)}>
            <div className={classNames(Styles.home)}>
              <div className={classNames(Styles.box, Styles.box1)}>
                <TopBox />
              </div>
              <div className={classNames(Styles.box, Styles.box2)}>
                <ChartBox {...chartBoxUser} />
              </div>
              <div className={classNames(Styles.box, Styles.box3)}>
                <ChartBox {...chartBoxCourse} />
              </div>
              <div className={classNames(Styles.box, Styles.box4)}>
                <PieChartBox />
              </div>
              <div className={classNames(Styles.box, Styles.box5)}>
                <ChartBox {...chartBoxRevenue} />
              </div>
              <div className={classNames(Styles.box, Styles.box6)}>
                <ChartBox {...chartBoxConversion} />
              </div>
              <div className={classNames(Styles.box, Styles.box7)}>
                <BigChartBox />
              </div>
              <div className={classNames(Styles.box, Styles.box8)}>
                <BarChartBox {...barChartBoxVisit} />
              </div>
              <div className={classNames(Styles.box, Styles.box9)}>
                <BarChartBox {...barChartBoxRevenue} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
