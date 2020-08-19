import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
// @material-ui/icons
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import Button from 'components/CustomButtons/Button.js';
import Table from 'components/Table/Table.js';
import {
  getMyCampBookings,
  getCampById,
  getMyCourseBookings,
  getCourseById
} from '../../APIUtils';
import { formatDateWithoutHours } from '../../DateUtils';
// own components
import MarsLoader from 'myComponents/MarsLoader/MarsLoader';
import { DivWithParallaxPaper } from 'myComponents/withParallaxPaper';
// styles
import MainPageStyle from '../../assets/jss/material-kit-pro-react/myViews/mainPageStyle.js';
import sectionPillsStyle from 'assets/jss/material-kit-pro-react/views/blogPostsSections/sectionPillsStyle.js';

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
            console.log(camp1);
            console.log(camp2);
            campBooking = {
              campNames: [camp1.campName, camp2.campName],
              camp1Days: camp1.days,
              camp2Days: camp2.days,
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
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [setMyCampBookings, setIsLoading]);

  return (
    <DivWithParallaxPaper
      title="Meine Buchungen"
      image="https://www.marswiese.at/wordpress/wp-content/uploads/Banner3.jpg"
    >
      <div className={mainPageClasses.container}>
        <div className={sectionPillsClasses.section}>
          {(() => {
            if (isLoading)
              return (
                <GridContainer justify="center">
                  <MarsLoader />
                </GridContainer>
              );
            else {
              return (
                <div>
                  {/* CAMP BOOKINGS TABLE */}
                  {myCampBookings.length > 0 ? (
                    <div>
                      <h2>Gebuchte Camps</h2>
                      <Table
                        striped
                        tableHead={[
                          '',
                          'PRODUKT',
                          'TEILNEHMER',
                          'GEBUCHTE TAGE',
                          'DETAILS',
                          'RANDBETREUUNG',
                          'AKTIONEN'
                        ]}
                        tableData={myCampBookings.map(campBooking => [
                          <div
                            className={mainPageClasses.imgContainer}
                            key={campBooking.id}
                          ></div>,
                          <div key={campBooking.id}>Feriencamp</div>,
                          <div key={campBooking.id}>
                            {campBooking.kid.name}
                          </div>,
                          <Tooltip
                            key={campBooking.id}
                            id="close1"
                            title={campBooking.camp1Days.map((day, idx) => {
                              return (
                                <p key={idx}>{formatDateWithoutHours(day)}</p>
                              );
                            })}
                            placement="top"
                            classes={{ tooltip: mainPageClasses.tooltip }}
                          >
                            <div key={campBooking.id} className="tooltip">
                              {formatDateWithoutHours(
                                campBooking.camp1Days[0]
                              ) +
                                ' bis ' +
                                formatDateWithoutHours(
                                  campBooking.camp1Days[
                                    campBooking.camp1Days.length - 1
                                  ]
                                )}
                            </div>
                          </Tooltip>,
                          <div key={campBooking.id}>
                            VM: {campBooking.campNames[0]}, NM:
                            {campBooking.campNames[1]}
                          </div>,
                          <div key={campBooking.id}>
                            {campBooking.morningChildCare && 'VM'}{' '}
                            {campBooking.afternoonChildCare && 'NM'}
                          </div>,
                          <Tooltip
                            key={campBooking.id}
                            id="close1"
                            title="Buchung stornieren"
                            placement="left"
                            classes={{ tooltip: mainPageClasses.tooltip }}
                          >
                            <Button
                              link
                              className={mainPageClasses.actionButton}
                            >
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
                  ) : null}

                  {/* COURSE BOOKINGS TABLE */}
                  {myCourseBookings.length > 0 ? (
                    <div>
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
                            <Button
                              link
                              className={mainPageClasses.actionButton}
                            >
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
                  ) : null}
                </div>
              );
            }
          })()}
        </div>
      </div>
    </DivWithParallaxPaper>
  );
};

export default BookingsPage;
