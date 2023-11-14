import classNames from 'classnames';
import React from 'react';
import Styles from './Courses.module.scss';
import courseImg1 from '../../../assets/images/web-design.png';
import { Link, useNavigate } from 'react-router-dom';
import { MdFavorite } from 'react-icons/md';

const CourseCard = (props) => {
  const { id, image, name, status, description, price, averagePoint } = props.item;
  const navigate = useNavigate();

  return (
    <div className={classNames(Styles.single__course__item)}>
      <div
        className={classNames(Styles.course__img)}
        onClick={() => {
          navigate(`/overview-course/${id}`);
        }}
      >
        <img src={courseImg1} alt="" className="w-100" />
      </div>

      <div className={classNames(Styles.course__details)}>
        <h6 className={classNames(Styles.course__title, 'mb-4')}>{name}</h6>

        <div className="d-flex justify-content-between align-items-center">
          <p className={classNames(Styles.lesson, 'd-flex align-items-center gap-1')}>
            <i className="ri-book-open-line"></i> {description}s
          </p>

          <p className={classNames(Styles.students, 'd-flex align-items-center gap-1')}>
            <i className={classNames('ri-user-line')}></i> {price.toLocaleString()} VND
          </p>
        </div>

        <div className=" d-flex justify-content-between align-items-center">
          <p className={classNames(Styles.rating, 'd-flex align-items-center gap-1')}>
            <i className={classNames('ri-star-fill')}></i> {averagePoint} <MdFavorite />
          </p>

          <p className={classNames(Styles.enroll, 'd-flex align-items-center gap-1')}>
            <Link to={`/overview-course/${id}`}> Enroll Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
