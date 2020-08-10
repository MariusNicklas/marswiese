import React, { useState, useEffect } from 'react';
// @material-ui core components
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
// own components
import MarsLoader from 'myComponents/MarsLoader/MarsLoader';
import { DivWithParallaxPaper } from '../../myComponents/withParallaxPaper';
// API utils
import { getCoursesByCategory } from '../../APIUtils';
// styles
import basicsStyle from 'assets/jss/material-kit-pro-react/views/componentsSections/basicsStyle.js';
import MainPageStyle from '../../assets/jss/material-kit-pro-react/myViews/mainPageStyle.js';
import sectionPillsStyle from 'assets/jss/material-kit-pro-react/views/blogPostsSections/sectionPillsStyle.js';

const useBasicStyles = makeStyles(basicsStyle);
const useMainPageStyles = makeStyles(MainPageStyle);
const useSectionPillsStyles = makeStyles(sectionPillsStyle);

const CoursesPage = props => {
  const basicClasses = useBasicStyles();
  const mainPageClasses = useMainPageStyles();
  const sectionPillsClasses = useSectionPillsStyles();

  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [multipleSelect, setMultipleSelect] = React.useState([]);
  const [ageSliderValue, setAgeSliderValue] = React.useState([]);
  const [selectedStartDate, setSelectedStartDate] = React.useState(Date.now());
  const [selectedEndDate, setSelectedEndDate] = React.useState(Date.now());

  const handleAgeSliderChange = (event, newValue) => {
    setAgeSliderValue(newValue);
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await getCoursesByCategory();
        setCategories(response);
        setMultipleSelect(response.map(c => c.categoryLabel));
        // calculate min and max age for double slider
        const minAgeArray = response.map(r => r.courses.map(c => c.minAge));
        const ageMin = Math.min(...[].concat(...minAgeArray));
        let maxAgeArray = response.map(r =>
          r.courses
            .map(c => c.maxAge)
            .filter(function(x) {
              return isFinite(x);
            })
        );
        const ageMax = Math.max(...[].concat(...maxAgeArray));
        setAgeSliderValue([ageMin, ageMax]);
        setIsLoading(false);
      } catch {}
    })();
  }, [setCategories]);

  const handleMultiple = event => {
    setMultipleSelect(event.target.value);
  };

  const handleStartDateChange = newDate => {
    setSelectedStartDate(newDate);
  };

  const handleEndDateChange = newDate => {
    setSelectedEndDate(newDate);
  };

  return (
    <DivWithParallaxPaper
      title="Kurse"
      image="https://www.marswiese.at/wordpress/wp-content/uploads/Banner3.jpg"
    >
      <div className={mainPageClasses.container}>
        <div className={sectionPillsClasses.section}>
          {(() => {
            if (isLoading) {
              return (
                <GridContainer justify="center">
                  <MarsLoader />
                </GridContainer>
              );
            } else {
              return (
                <div className={mainPageClasses.container}>
                  <Grid container spacing={2}>
                    {/* CATEGORY SELECT */}
                    <Grid item lg={6} md={6} xs={12}>
                      <Typography id="category-select-label" gutterBottom>
                        Kategorie
                      </Typography>
                      <Select
                        multiple
                        fullWidth
                        value={multipleSelect}
                        onChange={handleMultiple}
                        MenuProps={{
                          className: basicClasses.selectMenu,
                          classes: { paper: basicClasses.selectPaper }
                        }}
                        classes={{ select: basicClasses.select }}
                        inputProps={{
                          name: 'multipleSelect',
                          id: 'multiple-select'
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: basicClasses.selectMenuItem
                          }}
                        >
                          Mehrfachauswahl
                        </MenuItem>

                        {categories.map(category =>
                          category.numCourses > 0 ? (
                            <MenuItem
                              classes={{
                                root: basicClasses.selectMenuItem,
                                selected:
                                  basicClasses.selectMenuItemSelectedMultiple
                              }}
                              key={category.id}
                              value={category.categoryLabel}
                            >
                              {category.categoryLabel}
                            </MenuItem>
                          ) : null
                        )}
                      </Select>
                    </Grid>

                    {/* AGE SLIDER */}
                    <Grid item lg={6} md={6} xs={12}>
                      <div>
                        <Typography id="age-slider-label" gutterBottom>
                          Alter
                        </Typography>
                        <Slider
                          value={ageSliderValue}
                          onChange={handleAgeSliderChange}
                          valueLabelDisplay="auto"
                          aria-labelledby="range-slider"
                        />
                      </div>
                    </Grid>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid item lg={3} md={3} xs={6}>
                        {/* START DATE*/}
                        <Typography id="courses-start-date-label" gutterBottom>
                          Kurse vom
                        </Typography>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          margin="normal"
                          id="courses-start-date-picker"
                          value={selectedStartDate}
                          onChange={handleStartDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date'
                          }}
                        />
                      </Grid>

                      <Grid item lg={3} md={3} xs={6}>
                        {/* END DATE*/}
                        <Typography id="courses-end-date-label" gutterBottom>
                          Kurse bis
                        </Typography>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          margin="normal"
                          id="courses-end-date-picker"
                          value={selectedEndDate}
                          onChange={handleEndDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date'
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </Grid>

                  <Grid container spacing={2}>
                    {categories
                      .filter(category =>
                        multipleSelect.includes(category.categoryLabel)
                      )
                      .map(category =>
                        category.courses
                          .filter(
                            course =>
                              course.minAge >= ageSliderValue[0] &&
                              course.maxAge <= ageSliderValue[1]
                          )
                          .map(course => (
                            <Grid item key={course._id} xs={12} sm={6} md={3}>
                              <Card
                                onClick={() =>
                                  props.history.push('/Kurs/' + course._id)
                                }
                                raised
                                background
                                style={{
                                  backgroundImage:
                                    "url('https://www.marswiese.at/wordpress/wp-content/uploads/boulderbereich.jpg')"
                                }}
                              >
                                <CardBody background>
                                  <h3>{course.courseName}</h3>
                                  <h4>
                                    {course.minAge}
                                    {course.maxAge
                                      ? ' - ' + course.maxAge
                                      : '+'}
                                    {' Jahre'}
                                  </h4>
                                </CardBody>
                              </Card>
                            </Grid>
                          ))
                      )}
                  </Grid>
                </div>
              );
            }
          })()}
        </div>
      </div>
    </DivWithParallaxPaper>
  );
};

export default CoursesPage;
