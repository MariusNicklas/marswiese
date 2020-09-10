import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';

import sectionPillsStyle from 'assets/jss/material-kit-pro-react/views/blogPostsSections/sectionPillsStyle.js';
import { withRouter } from 'react-router-dom';

import campsImg from 'assets/myImg/Camp_Sternkreis.JPG';

const useStyles = makeStyles(sectionPillsStyle);

const SectionProducts = props => {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <h2>Angebote</h2>
      <GridContainer>
        {/* GRID ITEM 1 KURSE*/}
        <GridItem xs={12} sm={12} md={12}>
          <Card
            small
            onClick={() => props.history.push('/Kurse')}
            raised
            background
            style={{
              backgroundImage:
                "url('https://www.marswiese.at/wordpress/wp-content/uploads/Banner1.jpg')"
            }}
          >
            <CardBody background>
              <h3 className={classes.cardTitle}>Kurse</h3>
            </CardBody>
          </Card>
        </GridItem>

        {/* GRID ITEM 2 FERIENCAMPS*/}
        <GridItem xs={12} sm={6} md={6}>
          <Card
            small
            onClick={() => props.history.push('/Camps')}
            raised
            background
            style={{
              backgroundImage: `url(${campsImg})`
            }}
          >
            <CardBody background>
              <h3 className={classes.cardTitle}>Feriencamps</h3>
            </CardBody>
          </Card>
        </GridItem>

        {/* GRID ITEM 3 KINDERGEBURTSTAGE*/}
        <GridItem xs={12} sm={6} md={6}>
          <Card
            small
            onClick={() =>
              (window.location.href =
                'https://www.marswiese.at/buchung/kindergeburtstag/')
            }
            raised
            background
            style={{
              backgroundImage:
                "url('https://www.marswiese.at/buchung/images/kurse/wildnis2.jpg')"
            }}
          >
            <CardBody background>
              <h3 className={classes.cardTitle}>Kindergeburtstage</h3>
            </CardBody>
          </Card>
        </GridItem>

        {/* GRID ITEM 4 EIGENE VERANSTALTUNGEN*/}
        <GridItem xs={12} sm={12} md={12}>
          <Card
            small
            onClick={() =>
              (window.location.href =
                'https://www.marswiese.at/veranstaltungs-anfrage/')
            }
            raised
            background
            style={{
              backgroundImage: 'url()'
            }}
          >
            <CardBody background>
              <h3 className={classes.cardTitle}>Eigene Veranstaltung</h3>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default withRouter(SectionProducts);
