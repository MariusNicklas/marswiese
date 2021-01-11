import React, { useState, useEffect } from 'react';
// @material-ui core components
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
//import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
// own components
import MarsLoader from 'myComponents/MarsLoader/MarsLoader';
import { DivWithParallaxPaper } from '../../myComponents/withParallaxPaper';
import ValidatedTextField from '../../myComponents/ValidatedTextField.component';
// API utils
import { getCoursesByCategory } from '../../APIUtils';
import { justDate } from '../../DateUtils';

// styles
import basicsStyle from 'assets/jss/material-kit-pro-react/views/componentsSections/basicsStyle.js';
import MainPageStyle from '../../assets/jss/material-kit-pro-react/myViews/mainPageStyle.js';
import sectionPillsStyle from 'assets/jss/material-kit-pro-react/views/blogPostsSections/sectionPillsStyle.js';
import CoursesPageStyle from './CoursesPageStyles';

const useBasicStyles = makeStyles(basicsStyle);
const useMainPageStyles = makeStyles(MainPageStyle);
const useSectionPillsStyles = makeStyles(sectionPillsStyle);
const useCoursesPageStyles = makeStyles(CoursesPageStyle);

const CoursesPage = props => {
  // styles
  const basicClasses = useBasicStyles();
  const mainPageClasses = useMainPageStyles();
  const sectionPillsClasses = useSectionPillsStyles();
  const CoursesPageClasses = useCoursesPageStyles();

  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  // filter states
  const [multipleSelect, setMultipleSelect] = useState([]);
  const [age, setAge] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [chips, setChips] = useState([]);
  const [chipDeleted, setChipDeleted] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [resettingFilter, setResettingFilter] = useState(false);

  // ON MOUNT
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        // get courses and save to state variable "categories"
        const response = await getCoursesByCategory();
        setCategories(response);
        console.log(response)
        setFilteredCategories(response);
        initializeFilter(response);
        setIsLoading(false);
      } catch {}
    })();
  }, []);

  // initialize filter options
  const initializeFilter = categories => {
    setMultipleSelect(
      categories.filter(cat => cat.courses.length > 0).map(cat => cat.label)
    );
    setAge(null);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setFiltering(!filtering)
  };

  // create chips array
  const createChips = () => {
    var newChips = [];

    multipleSelect.map(value => newChips.push({ key: value, label: value }));
    if (age !== null) {
      newChips.push({
        key: 'age',
        label: age + ' Jahre'
      });
    }

    if (selectedStartDate !== null) {
      newChips.push({
        key: 'startDate',
        label: 'ab ' + justDate(selectedStartDate)
      });
    }

    if (selectedEndDate !== null) {
      newChips.push({
        key: 'endDate',
        label: 'bis ' + justDate(selectedEndDate)
      });
    }

    setChips(newChips);
    console.log("chips set to ", newChips)
  };

  // create chips when state variables change
  useEffect(() => {
    (async () => {
      try {
        createChips();
      } catch {}
    })();
  }, [filtering]);

  // apply filter when "filter" button is pressed or when filter was resetted
  useEffect(() => {
    (async () => {
      try {
        applyFilter();
      } catch {}
    })();
  }, [chipDeleted, resettingFilter]);

  

  // apply filter to courses with selected options
  const applyFilter = () => {
    setFiltering(true);
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
            /*course.minAge >= ageSliderValue[0] &&
            course.maxAge <= ageSliderValue[1]*/
            age === null ? true : (course.minAge <= age && course.maxAge >= age)
        )
      };
    });

    // filter courses by date
    const byDate =
      selectedStartDate !== null && selectedEndDate !== null
        ? byAge.map(category => {
            return {
              ...category,
              courses: category.courses.filter(
                course =>
                  new Date(course.timeUnits[0].startDate) >=
                    new Date(selectedStartDate) &&
                  new Date(
                    course.timeUnits[course.timeUnits.length - 1].endDate
                  ) <= new Date(selectedEndDate)
              )
            };
          })
        : byAge;

    setFilteredCategories(byDate);
    createChips();
    setFiltering(false);
  };

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

  const clearFilter = () => {
    initializeFilter(categories);
    setResettingFilter(!resettingFilter);
  };

  const handleDeleteChip = key => {
    setChips(chips => chips.filter(chip => chip.key !== key));
    switch (key) {
      /*case 'minAge':
        setAgeSliderValue([0, ageSliderValue[1]]);
        break;
      case 'maxAge':
        setAgeSliderValue([ageSliderValue[0], 100]);
        break;*/
      case 'age':
        setAge(null);
        setChipDeleted(!chipDeleted);
        break;
      case 'startDate':
        setSelectedStartDate(null);
        setChipDeleted(!chipDeleted);
        break;
      case 'endDate':
        setSelectedEndDate(null);
        setChipDeleted(!chipDeleted);
        break;
      default:
        setMultipleSelect(multipleSelect =>
          multipleSelect.filter(ms => ms !== key)
        );
        setChipDeleted(!chipDeleted);
    }
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
                  <div className={CoursesPageClasses.filterSection}>
                    <Grid id="main-container" container spacing={10}>
                      <Grid id="left-column" container item lg={6} xs={12} direction="column">
                          {/* CATEGORY SELECT */}
                          <Grid item>
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

                          {/* AGE INPUT FIELD */}
                          <Grid item>
                            <ValidatedTextField
                              id="age"
                              type="number"
                              name="age"
                              label="Alter des Teilnehmers"
                              value={age}
                              fullWidth
                              parentCallback={() => {}}
                              handleChange={e => setAge(e.target.value)}
                              validators={[]}
                            />
                          </Grid>

                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid id="third-row" container item>
                              {/* START DATE*/}
                              <Grid item lg={6} xs={12}>
                                <Typography
                                  id="courses-start-date-label"
                                  gutterBottom
                                >
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
                            
                              {/* END DATE*/}
                              <Grid item lg={6} xs={12}>
                                <Typography
                                  id="courses-end-date-label"
                                  gutterBottom
                                >
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
                            </Grid>
                          </MuiPickersUtilsProvider>
                      </Grid>

                      <Grid container item direction="column" lg={6} xs={12} justify="center" alignItems="center">
                          {/* APPLY FILTER BUTTON*/}
                          <Grid item>
                            <Button color="primary" onClick={() => applyFilter()}>
                              Filter anwenden
                            </Button>
                          </Grid>

                          {/* CLEAR FILTER BUTTON*/}
                          <Grid item>
                            <Button onClick={() => clearFilter()}>
                              Filter zurücksetzen
                            </Button>
                          </Grid>
                      </Grid>
                    </Grid>
                  </div>

                  {/* CHIPS FOR SET FILTERS */}
                  {chips.map(chip => (
                    <Chip
                      key={chip.key}
                      label={chip.label}
                      color="primary"
                      onDelete={() => {
                        handleDeleteChip(chip.key);
                      }}
                    />
                  ))}

                  <Grid container spacing={2}>
                    {filteredCategories.map(category => {
                      return (
                        <React.Fragment key={category._id}>
                          {/* display title only when there are actually courses */}
                          {category.courses.length > 0 && (
                            <h3>{category.label}</h3>
                          )}
                          <Grid container spacing={2}>
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
                                    small
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
                                      <h5>ab {course.minAge} Jahren</h5>
                                    </CardBody>
                                  </Card>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </React.Fragment>
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
