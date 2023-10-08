import React from 'react'
import Styles from "./Loading.module.scss"; // Correct the import statement
import { useSelector } from "react-redux";
import { loadingState$ } from "../../redux/selectors/LoadingSelector";
import classNames from "classnames";
import loadingGif from './../../assets/images/Rhombus.gif';

export default function Loading() {
  let isLoading = useSelector(loadingState$);

  if (isLoading) {
    return (
      <div className={classNames(Styles.bgLoading)}>
        <div className={Styles.loadingContent}>
          <img src={loadingGif} alt="loading" />
        </div>
      </div>
    );
  } else {
    return null; // Return null when not loading
  }
}
