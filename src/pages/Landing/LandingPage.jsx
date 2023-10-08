import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import GuessLanding from "./GuessLanding";
import StudentLanding from "./StudentLanding";

const LandingPage = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")))
  }, [])


  return (
    user !== null ? (
      <StudentLanding />
    ) : (
      <GuessLanding />
    )
  );
};

export default LandingPage;
