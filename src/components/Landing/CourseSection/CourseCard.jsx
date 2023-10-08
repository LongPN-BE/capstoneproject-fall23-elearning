import classNames from "classnames";
import React from "react";
import Styles from "./Courses.module.scss";

const CourseCard = (props) => {
  const { imgUrl, title, lesson, students, rating } = props.item;

  return (
    <div className={classNames(Styles.single__course__item)}>
      <div className={classNames(Styles.course__img)}>
        <img src={imgUrl} alt="" className="w-100" />
      </div>

      <div className={classNames(Styles.course__details)}>
        <h6 className={classNames(Styles.course__title, "mb-4")}>{title}</h6>

        <div className="d-flex justify-content-between align-items-center">
          <p
            className={classNames(
              Styles.lesson,
              "d-flex align-items-center gap-1"
            )}
          >
            <i className="ri-book-open-line"></i> {lesson} Lessons
          </p>

          <p
            className={classNames(
              Styles.students,
              "d-flex align-items-center gap-1"
            )}
          >
            <i className={classNames("ri-user-line")}></i> {students}K
          </p>
        </div>

        <div className=" d-flex justify-content-between align-items-center">
          <p
            className={classNames(
              Styles.rating,
              "d-flex align-items-center gap-1"
            )}
          >
            <i className={classNames("ri-star-fill")}></i> {rating}K
          </p>

          <p
            className={classNames(
              Styles.enroll,
              "d-flex align-items-center gap-1"
            )}
          >
            <a href="/"> Enroll Now</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
