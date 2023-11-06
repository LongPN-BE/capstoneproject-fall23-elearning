import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TimerIcon from "@mui/icons-material/Timer";

const Timer = (props) => {
  const { timeMinute } = props;
  const [seconds, setSeconds] = useState(timeMinute * 60 || 0);

  useEffect(() => {
    const timer =
      seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds]);
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  return (
    <div className="d-flex align-items-center" style={{ color: "#1d7c50" }}>
      <Typography variant="caption">
        <TimerIcon />
        {formatTime(seconds)} remaining
      </Typography>
    </div>
  );
};

export default Timer;
