import React, { useState, useEffect } from "react";
// core components
import { makeStyles } from "@material-ui/core/styles";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { getCoursesByCategory } from "../../APIUtils";

import basicsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/basicsStyle.js";
import MainPageStyle from "../../assets/jss/material-kit-pro-react/myViews/mainPageStyle.js";

const useBasicStyles = makeStyles(basicsStyle);
const useMainPageStyles = makeStyles(MainPageStyle);

const CoursesPage = (props) => {
  const basicClasses = useBasicStyles();
  const mainPageClasses = useMainPageStyles();

  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [multipleSelect, setMultipleSelect] = React.useState([]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await getCoursesByCategory();
        setCategories(response);
        setMultipleSelect(response.map((c) => c.categoryLabel));
        setIsLoading(false);
      } catch {}
    })();
  }, [setCategories]);

  const handleMultiple = (event) => {
    setMultipleSelect(event.target.value);
  };

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
        >
          <div className={basicClasses.container}>
            <GridContainer justify="center">
              <GridItem
                xs={12}
                sm={12}
                md={8}
                className={basicClasses.textCenter}
              >
                <h2 className={basicClasses.title}>Kurse</h2>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={mainPageClasses.main}>
          <div className={mainPageClasses.container}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Kategorie</InputLabel>
              <Select
                multiple
                value={multipleSelect}
                onChange={handleMultiple}
                MenuProps={{
                  className: basicClasses.selectMenu,
                  classes: { paper: basicClasses.selectPaper },
                }}
                classes={{ select: basicClasses.select }}
                inputProps={{
                  name: "multipleSelect",
                  id: "multiple-select",
                }}
              >
                <MenuItem
                  disabled
                  classes={{
                    root: basicClasses.selectMenuItem,
                  }}
                >
                  Mehrfachauswahl
                </MenuItem>

                {categories.map((category) =>
                  category.numCourses > 0 ? (
                    <MenuItem
                      classes={{
                        root: basicClasses.selectMenuItem,
                        selected: basicClasses.selectMenuItemSelectedMultiple,
                      }}
                      key={category.id}
                      value={category.categoryLabel}
                    >
                      {category.categoryLabel}
                    </MenuItem>
                  ) : null
                )}
              </Select>
            </FormControl>
            <GridContainer>
              {categories
                .filter((category) =>
                  multipleSelect.includes(category.categoryLabel)
                )
                .map((category) =>
                  category.courses.map((course) => (
                    <GridItem key={course.id} xs={12} sm={6} md={3}>
                      <Card
                        onClick={() => props.history.push("/Kurs/" + course.id)}
                        raised
                        background
                        style={{
                          backgroundImage:
                            "url('https://www.marswiese.at/wordpress/wp-content/uploads/boulderbereich.jpg')",
                        }}
                      >
                        <CardBody background>
                          <h3>{course.courseName}</h3>
                          <h4>
                            {course.minAge}
                            {course.maxAge ? " - " + course.maxAge : "+"}
                            {" Jahre"}
                          </h4>
                        </CardBody>
                      </Card>
                    </GridItem>
                  ))
                )}
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
};

export default CoursesPage;
