import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import Styles from './Courses.module.scss';
import courseImg2 from '../../../assets/images/graphics-design.png';
import { Link, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CardActions,
  Button,
  Avatar,
} from '@material-ui/core';

const CourseCard = (props) => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    id: '',
    image: '',
    name: '',
    price: '',
    description: '',
    teacher: {
      name: '',
      email: '',
    },
    subject: {
      name: '',
      minPrice: '',
    },
  });
  useEffect(() => {
    if (props) {
      setData({
        id: '',
        image: props.item.image,
        name: props.item.name,
        price: props.item.price,
        description: props.item.description,
        teacher: {
          name: props.item.teacher.account.profile.lastName + ' ' + props.item.teacher.account.profile.firstName,
          email: '',
        },
        subject: {
          name: props.item.subject.name,
          minPrice: '',
        },
      });
    }
  }, [props]);

  const handleOnclickCourse = () => {
    navigate('##');
  };

  return (
    <>
      <Card className="mt-5" sx={{ maxWidth: 345, maxHeight: 200 }}>
        <CardActionArea onClick={() => handleOnclickCourse()}>
          <CardMedia component="img" height="200" image={data.image} alt="green iguana" />
          <CardContent style={{ height: 200 }}>
            <div style={{ height: 60 }}>
              <Typography gutterBottom variant="h6" component="div">
                {data.name}
              </Typography>
            </div>

            <Typography gutterBottom variant="caption" className="mt-2" style={{ fontSize: 15 }} component="div">
              <strong>{data.subject.name}</strong>
            </Typography>
            <div style={{ height: 50 }}>
              <Typography className={classNames(Styles.description_style)} variant="body2" color="text.secondary">
                {data.description}
              </Typography>
            </div>
            <Typography className={classNames(Styles.description_style)} variant="body2" color="text.secondary">
              {data.price?.toLocaleString()} VNĐ
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            <Avatar
              className="p-2 mx-2"
              style={{ width: 30, height: 30 }}
              alt={data.teacher.name}
              src={data.teacher.name}
            />
            {data.teacher.name}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default CourseCard;
