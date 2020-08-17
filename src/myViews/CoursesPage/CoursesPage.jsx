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
  const [multipleSelect, setMultipleSelect] = useState([]);
  const [ageSliderValue, setAgeSliderValue] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(Date.now());
  const [selectedEndDate, setSelectedEndDate] = useState(
    new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
  );

  const handleAgeSliderChange = (event, newValue) => {
    setAgeSliderValue(newValue);
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await getCoursesByCategory();
        setCategories(response);
        setMultipleSelect(
          response.filter(cat => cat.courses.length > 0).map(cat => cat.label)
        );
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
  }, []);

  const handleMultipleSelect = event => {
    setMultipleSelect(event.target.value);
  };

  const handleStartDateChange = newDate => {
    const date = new Date(newDate);
    date.setHours(0, 0, 0, 0);
    setSelectedStartDate(date);
  };

  const handleEndDateChange = newDate => {
    const date = new Date(newDate);
    date.setHours(0, 0, 0, 0);
    setSelectedEndDate(date);
  };

  const filterCategories = () => {
    // filter courses by selected categries
    const byCategory = categories.filter(category =>
      multipleSelect.includes(category.label)
    );

    // filter courses by selected age range
    const byAge = byCategory.map(category => {
      return {
        ...category,
        courses: category.courses.filter(
          course =>
            course.minAge >= ageSliderValue[0] &&
            course.maxAge <= ageSliderValue[1]
        )
      };
    });

    const byDate = byAge.map(category => {
      return {
        ...category,
        courses: category.courses.filter(
          course =>
            new Date(course.timeUnits[0].startDate) >=
              new Date(selectedStartDate) &&
            new Date(course.timeUnits[course.timeUnits.length - 1].endDate) <=
              new Date(selectedEndDate)
        )
      };
    });

    return byDate;
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
                        onChange={handleMultipleSelect}
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
                          category.courses.length > 0 ? (
                            <MenuItem
                              classes={{
                                root: basicClasses.selectMenuItem,
                                selected:
                                  basicClasses.selectMenuItemSelectedMultiple
                              }}
                              key={category.id}
                              value={category.label}
                            >
                              {category.label}
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
                    {filterCategories().map(category => {
                      return (
                        <Grid key={category._id} container direction="column">
                          <div key={category._id}>
                            {/* display title only when there are actually courses */}
                            {category.courses.length > 0 && (
                              <h3>{category.label}</h3>
                            )}

                            {category.courses.map(course => {
                              return (
                                <Grid
                                  item
                                  key={course._id}
                                  xs={12}
                                  sm={6}
                                  md={3}
                                >
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
                              );
                            })}
                          </div>
                        </Grid>
                      );
                    })}
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
