import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//@material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import contactUsStyle from "assets/jss/material-kit-pro-react/views/contactUsStyle.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/icons
import PeopleIcon from "@material-ui/icons/People";
import EuroSymbolIcon from "@material-ui/icons/EuroSymbol";
// core components
import Parallax from "components/Parallax/Parallax.js";
import Button from "components/CustomButtons/Button.js";

import { getCourse } from "../../APIUtils";

const useStyles = makeStyles(contactUsStyle);

const CoursePage = (props) => {
  const { history } = props;

  const { id } = useParams();

  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState({});

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const course = await getCourse(id);
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
        <Parallax
          image={
            "https://www.marswiese.at/wordpress/wp-content/uploads/Banner3.jpg"
          }
          filter="dark"
          small
        />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem md={6} sm={6}>
                <h3 className={classes.title}>
                  {course.description} {course.courseName}
                </h3>

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
                <Button
                  key="book-course-button"
                  color="primary"
                  onClick={() =>
                    history.push(props.location.pathname + "/buchen")
                  }
                >
                  Kurs buchen
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
};

export default CoursePage;
