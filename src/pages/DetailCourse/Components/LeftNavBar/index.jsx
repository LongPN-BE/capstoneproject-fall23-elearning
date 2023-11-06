import { ListItemButton, ListItemText } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import Styles from "./LeftNavBar.module.scss";

function LeftNavBar(props) {
  const { courseId } = props;
  const links = [
    {
      id: "lessons",
      url: `/courses/${courseId}`,
      label: "Lessons",
    },
    {
      id: "grades",
      url: `/courses/${courseId}/grades`,
      label: "Grades",
    },
    {
      id: "resources",
      url: `/courses/${courseId}/resources`,
      label: "Resources",
    },
    {
      id: "course-info",
      url: `/courses/${courseId}/info`,
      label: "Course Info",
    },
  ];
  const localtion = useLocation();

  return (
    <>
      <ul className={classNames(Styles.navbar)}>
        {links.map((item) => {
          return (
            <li
              className={
                localtion.pathname === item.url
                  ? classNames(Styles.navbar__active)
                  : ""
              }
            >
              <Link to={item.url}>{item.label}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default LeftNavBar;
