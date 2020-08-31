import React, { useState, useEffect } from 'react';
// @material-ui core components
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
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
  const [ageSliderValue, setAgeSliderValue] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();
  const [clearFilter, setClearFilter] = useState(false);
  const [chips, setChips] = useState([]);

  const handleAgeSliderChange = (event, newValue) => {
    setAgeSliderValue(newValue);
  };

  // SET CATEGORIES ON MOUNT
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await getCoursesByCategory();
        setCategories(response);
        setFilteredCategories(response);
        setIsLoading(false);
      } catch {}
    })();
  }, []);

  // SET FILTER ON MOUNT
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setMultipleSelect(
          categories.filter(cat => cat.courses.length > 0).map(cat => cat.label)
        );
        // calculate min and max age for double slider
        const minAgeArray = categories.map(r => r.courses.map(c => c.minAge));
        const ageMin = Math.min(...[].concat(...minAgeArray));
        let maxAgeArray = categories.map(r =>
          r.courses
            .map(c => c.maxAge)
            .filter(function(x) {
              return isFinite(x);
            })
        );
        const ageMax = Math.max(...[].concat(...maxAgeArray));
        setAgeSliderValue([ageMin, ageMax]);
        setSelectedStartDate(Date.now());
        setSelectedEndDate(new Date(Date.now() + 1000 * 60 * 60 * 24 * 365));
        setChips([]);
        setIsLoading(false);
      } catch {}
    })();
  }, [clearFilter]);

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

  const applyFilter = () => {
    // filter courses by selected categries
    const byCategory = categories.filter(category =>
      multipleSelect.includes(category.label)
    );

    var newChips = [];
    multipleSelect.map(value => newChips.push({ key: value, label: value }));

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

    if (ageSliderValue[0] > 0) {
      newChips.push({
        key: 'minAge',
        label: 'ab ' + ageSliderValue[0] + ' Jahre'
      });
    }

    if (ageSliderValue[1] < 100) {
      newChips.push({
        key: 'maxAge',
        label: 'bis ' + ageSliderValue[1] + ' Jahre'
      });
    }

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

    setFilteredCategories(byDate);
  };

  const resetFilter = () => {
    setClearFilter(!clearFilter);
  };

  const handleDeleteChip = key => {
    setChips(chips => chips.filter(chip => chip.key !== key));
    switch (key) {
      case 'minAge':
        setAgeSliderValue([0, ageSliderValue[1]]);
        break;
      case 'maxAge':
        setAgeSliderValue([ageSliderValue[0], 100]);
        break;
      case 'startDate':
        setSelectedStartDate(null);
        break;
      case 'endDate':
        setSelectedEndDate(null);
        break;
      default:
        setMultipleSelect(multipleSelect =>
          multipleSelect.filter(ms => ms !== key)
        );
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

                        {/* APPLY FILTER BUTTON*/}
                        <Grid item lg={3} md={3} xs={6}>
                          <Button color="primary" onClick={applyFilter}>
                            Filter anwenden
                          </Button>
                        </Grid>

                        {/* CLEAR FILTER BUTTON*/}
                        <Grid item lg={3} md={3} xs={6}>
                          <Button onClick={resetFilter}>
                            Filter zurücksetzen
                          </Button>
                        </Grid>
                      </MuiPickersUtilsProvider>
                    </Grid>

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
                  </div>

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
