import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Pie } from "react-chartjs-2";
import styles from "./Chart.module.css";
import Grid from "@material-ui/core/Grid";

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
  // console.log({ confirmed, deaths, recovered });

  const [dailyData, setDailyData] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
  }, [dailyData]);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;
  const PieChart = confirmed ? (
    <Pie
      data={{
        labels: ["Infected", "Recoverd", "Deaths"],
        datasets: [
          {
            data: [confirmed.value, recovered.value, deaths.value],
            backgroundColor: ["#8080ff", "#80ff80", "#ff8080"],
          },
        ],
      }}
    />
  ) : null;
  return (
    <div className={styles.container}>{country ? PieChart : lineChart}</div>
  );
};
export default Chart;
