import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
/*import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@material-ui/core";*/
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";

import { getMyCampBookings, getCampById } from "../../APIUtils";

import MainPageStyle from "../../assets/jss/material-kit-pro-react/myViews/mainPageStyle.js";

const useStyles = makeStyles(MainPageStyle);

const BookingsPage = () => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const [myCampBookings, setMyCampBookings] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await getMyCampBookings();
        const newResponse = await Promise.all(
          response.map(async (campBooking) => {
            const campIds = campBooking.camps;
            const camp1 = await getCampById(campIds[0]);
            const camp2 = await getCampById(campIds[1]);
            campBooking = {
              campNames: [camp1.campName, camp2.campName],
              ...campBooking,
            };
            return campBooking;
          })
        );
        setMyCampBookings(newResponse);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [setMyCampBookings, setIsLoading]);

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
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.textCenter}>
                <h2 className={classes.title}>Meine Buchungen</h2>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classes.main}>
          <div className={classes.container}>
            <div className={classNames(classes.main, classes.mainRaised)}>
              <Table
                tableHead={["", "PRODUKT", "ERSTELLT AM", "DETAILS", ""]}
                tableData={myCampBookings.map((campBooking) => [
                  <div
                    className={classes.imgContainer}
                    key={campBooking.id}
                  ></div>,
                  <div key={campBooking.id}>
                    Feriencamp für {campBooking.kid.name}
                  </div>,
                  <div key={campBooking.id}>{campBooking.createdAt}</div>,
                  <div key={campBooking.id}>
                    {campBooking.campNames[0]}, {campBooking.campNames[1]}
                  </div>,
                  <Tooltip
                    key={campBooking.id}
                    id="close1"
                    title="Buchung stornieren"
                    placement="left"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button link className={classes.actionButton}>
                      <Close />
                    </Button>
                  </Tooltip>,
                ])}
                tableShopping
                customHeadCellClasses={[
                  classes.textCenter,
                  classes.description,
                  classes.textRight,
                  classes.textRight,
                ]}
                customHeadClassesForCells={[0, 1, 3, 4]}
                customCellClasses={[
                  classes.tdName,
                  classes.customFont,
                  classes.customFont,
                  classes.tdNumber,
                ]}
                customClassesForCells={[1, 2, 3, 4]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default BookingsPage;
