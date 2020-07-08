import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
// @material-ui/icons
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
// core components
import Parallax from 'components/Parallax/Parallax.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Table from 'components/Table/Table.js';
import {
  getMyCampBookings,
  getCampById,
  getMyCourseBookings,
  getCourseById
} from '../../APIUtils';

import MainPageStyle from '../../assets/jss/material-kit-pro-react/myViews/mainPageStyle.js';
import sectionPillsStyle from 'assets/jss/material-kit-pro-react/views/blogPostsSections/sectionPillsStyle.js';
import MarsLoader from 'myComponents/MarsLoader/MarsLoader';

const useMainPageStyles = makeStyles(MainPageStyle);
const useSectionPillsStyles = makeStyles(sectionPillsStyle);

const BookingsPage = () => {
  const mainPageClasses = useMainPageStyles();
  const sectionPillsClasses = useSectionPillsStyles();

  const [isLoading, setIsLoading] = useState(true);
  const [myCampBookings, setMyCampBookings] = useState([]);
  const [myCourseBookings, setMyCourseBookings] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        // get booked camps
        const campBookings = await getMyCampBookings();
        const campBookingsWithNames = await Promise.all(
          campBookings.map(async campBooking => {
            const campIds = campBooking.camps;
            const camp1 = await getCampById(campIds[0]);
            const camp2 = await getCampById(campIds[1]);
            campBooking = {
              campNames: [camp1.campName, camp2.campName],
              ...campBooking
            };
            return campBooking;
          })
        );
        setMyCampBookings(campBookingsWithNames);

        // get booked courses
        const courseBookings = await getMyCourseBookings();
        const courseBookingsWithNames = await Promise.all(
          courseBookings.map(async courseBooking => {
            const courseId = courseBooking.course;
            const course = await getCourseById(courseId);
            courseBooking = {
              courseName: course,
              ...courseBooking
            };
            return courseBooking;
          })
        );
        setMyCourseBookings(courseBookingsWithNames);
        console.log(courseBookingsWithNames);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [setMyCampBookings, setIsLoading]);

  return (
    <div>
      <Parallax
        image={
          'https://www.marswiese.at/wordpress/wp-content/uploads/Banner3.jpg'
        }
        small
      >
        <div className={mainPageClasses.container}>
          <GridContainer justify="center">
            <GridItem
              xs={12}
              sm={12}
              md={8}
              className={mainPageClasses.textCenter}
            >
              <h2 className={mainPageClasses.title}>Meine Buchungen</h2>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div
        className={classNames(mainPageClasses.main, mainPageClasses.mainRaised)}
      >
        <div className={mainPageClasses.container}>
          <div className={sectionPillsClasses.section}>
            {(() => {
              if (isLoading) return <MarsLoader />;
              else {
                return (
                  <div>
                    {/* CAMP BOOKINGS TABLE */}
                    <Table
                      striped
                      tableHead={[
                        '',
                        'PRODUKT',
                        'TEILNEHMER',
                        'ERSTELLT AM',
                        'DETAILS',
                        'AKTIONEN'
                      ]}
                      tableData={myCampBookings.map(campBooking => [
                        <div
                          className={mainPageClasses.imgContainer}
                          key={campBooking.id}
                        ></div>,
                        <div key={campBooking.id}>Feriencamp</div>,
                        <div key={campBooking.id}>{campBooking.kid.name}</div>,
                        <div key={campBooking.id}>{campBooking.createdAt}</div>,
                        <div key={campBooking.id}>
                          {campBooking.campNames[0]}, {campBooking.campNames[1]}
                        </div>,
                        <Tooltip
                          key={campBooking.id}
                          id="close1"
                          title="Buchung stornieren"
                          placement="left"
                          classes={{ tooltip: mainPageClasses.tooltip }}
                        >
                          <Button link className={mainPageClasses.actionButton}>
                            <DeleteOutlinedIcon />
                          </Button>
                        </Tooltip>
                      ])}
                      tableShopping
                      customHeadCellClasses={[
                        mainPageClasses.textCenter,
                        mainPageClasses.description,
                        mainPageClasses.textRight,
                        mainPageClasses.textRight
                      ]}
                      customHeadClassesForCells={[0, 1, 3, 4]}
                      customCellClasses={[
                        mainPageClasses.tdName,
                        mainPageClasses.customFont,
                        mainPageClasses.customFont,
                        mainPageClasses.tdNumber
                      ]}
                      customClassesForCells={[1, 2, 3, 4]}
                    />

                    {/* COURSE BOOKINGS TABLE */}
                    <h2>Gebuchte Kurse</h2>
                    <Table
                      striped
                      tableHead={[
                        '',
                        'PRODUKT',
                        'TEILNEHMER',
                        'ERSTELLT AM',
                        'AKTIONEN'
                      ]}
                      tableData={myCourseBookings.map(courseBooking => [
                        <div
                          className={mainPageClasses.imgContainer}
                          key={courseBooking._id}
                        ></div>,
                        <div key={courseBooking._id}>
                          {courseBooking.courseName.description}{' '}
                          {courseBooking.courseName.courseName}
                        </div>,
                        <div key={courseBooking._id}>
                          {courseBooking.participant.name}
                        </div>,
                        <div key={courseBooking._id}>
                          {courseBooking.createdAt}
                        </div>,

                        <Tooltip
                          key={courseBooking._id}
                          id="close1"
                          title="Buchung stornieren"
                          placement="left"
                          classes={{ tooltip: mainPageClasses.tooltip }}
                        >
                          <Button link className={mainPageClasses.actionButton}>
                            <DeleteOutlinedIcon />
                          </Button>
                        </Tooltip>
                      ])}
                      tableShopping
                      customHeadCellClasses={[
                        mainPageClasses.textCenter,
                        mainPageClasses.description,
                        mainPageClasses.textRight,
                        mainPageClasses.textRight
                      ]}
                      customHeadClassesForCells={[0, 1, 3, 4]}
                      customCellClasses={[
                        mainPageClasses.tdName,
                        mainPageClasses.customFont,
                        mainPageClasses.customFont,
                        mainPageClasses.tdNumber
                      ]}
                      customClassesForCells={[1, 2, 3, 4]}
                    />
                  </div>
                );
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
