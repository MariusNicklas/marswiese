import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
//@material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import contactUsStyle from 'assets/jss/material-kit-pro-react/views/contactUsStyle.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import InfoArea from 'components/InfoArea/InfoArea.js';
import Tooltip from '@material-ui/core/Tooltip';
// @material-ui/icons
import PeopleIcon from '@material-ui/icons/People';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import DateRangeIcon from '@material-ui/icons/DateRange';
// core components
import Button from 'components/CustomButtons/Button.js';
// own components
import { DivWithParallaxPaper } from '../../myComponents/withParallaxPaper';

import { getCourse } from '../../APIUtils';
import { formatDateWithHours, formatHour } from '../../DateUtils';

const useStyles = makeStyles(contactUsStyle);

const CoursePage = props => {
  const { history } = props;

  const { id } = useParams();

  const classes = useStyles();

  const [isLoading, setIsLoading] = React.useState(true);
  const [course, setCourse] = React.useState({});
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [dates, setDates] = React.useState([]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const course = await getCourse(id);
        console.log(course);
        const start = formatDateWithHours(course.timeUnits[0].startDate);
        setStartDate(start);
        const end = course.timeUnits[course.timeUnits.length - 1].endDate;
        setEndDate(formatDateWithHours(end));

        setDates(
          course.timeUnits.map(
            tu =>
              formatDateWithHours(tu.startDate) +
              ' bis ' +
              formatHour(tu.endDate) +
              ' Uhr'
          )
        );

        setCourse(course);
        setIsLoading(false);
      } catch {}
    })();
  }, [id]);

  if (isLoading) {
    return <div>Lade Daten...</div>;
  } else {
    return (
      <div>
        <DivWithParallaxPaper
          title={course.description}
          image="https://www.marswiese.at/wordpress/wp-content/uploads/Banner3.jpg"
        >
          <div className={classes.container}>
            <GridContainer>
              <GridItem md={6} sm={6}>
                <h3 className={classes.title}>{course.courseName}</h3>

                <h4>
                  <i>{course.category.defaultShortDescriptionCamps}</i>
                </h4>
                <p>{course.category.defaultLongDescriptionCamps}</p>
              </GridItem>

              <GridItem md={4} sm={4} className={classes.mlAuto}>
                <InfoArea
                  className={classes.info}
                  title="Teilnehmer"
                  description={
                    <p>
                      {course.numParticipants + course.numPseudoParticipants}/
                      {course.maxParticipants}
                    </p>
                  }
                  icon={PeopleIcon}
                  iconColor="primary"
                />
                <InfoArea
                  className={classes.info}
                  title="Preis"
                  description={<p>{course.price}</p>}
                  icon={EuroSymbolIcon}
                  iconColor="primary"
                />

                <InfoArea
                  className={classes.info}
                  title="Termine"
                  description={<p>{dates}</p>}
                  icon={DateRangeIcon}
                  iconColor="primary"
                />

                <Button
                  key="book-course-button"
                  color="primary"
                  onClick={() =>
                    history.push(props.location.pathname + '/buchen')
                  }
                >
                  Kurs buchen
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </DivWithParallaxPaper>
      </div>
    );
  }
};

export default CoursePage;
