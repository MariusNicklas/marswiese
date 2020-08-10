import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
// own components
import { DivWithParallaxPaper } from '../../myComponents/withParallaxPaper';
// react component for creating beautiful carousel
import Carousel from 'react-slick';

import contactUsStyle from 'assets/jss/material-kit-pro-react/views/contactUsStyle.js';

const useContactUsStyles = makeStyles(contactUsStyle);

const CoursesOverviewPage = props => {
  const { history } = props;

  const contactUsClasses = useContactUsStyles();

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true
  };

  return (
    <DivWithParallaxPaper
      title="Kurse an der Marswiese"
      image="https://www.marswiese.at/wordpress/wp-content/uploads/Banner3.jpg"
    >
      <div className={contactUsClasses.contactContent}>
        <div className={contactUsClasses.container}>
          <GridContainer>
            <GridItem md={6} sm={6}>
              <Carousel {...carouselSettings}>
                <div>
                  <img
                    src={
                      'https://www.marswiese.at/buchung/images/kurse/infrastruktur_klettern.JPG'
                    }
                    alt="First slide"
                    className="slick-image"
                  />
                  <div className="slick-caption"></div>
                </div>

                <div>
                  <img
                    src={
                      'https://www.marswiese.at/buchung/images/kurse/infrastruktur_tennis.JPG'
                    }
                    alt="Second slide"
                    className="slick-image"
                  />
                  <div className="slick-caption"></div>
                </div>
              </Carousel>
            </GridItem>
            <GridItem md={6} sm={6}>
              <h2 className={contactUsClasses.title}>
                Die Marswiese als Veranstaltungsort
              </h2>
              <h5>
                Das Sportzentrum Marswiese ist aufgrund seiner Infrastruktur
                perfekt für Kurse verschiedener Sportarten geeignet! Je nach
                Sportart finden die Kurse in der Kletterhalle, der Tennishalle,
                der Ballspielhalle oder wenn es das Wetter zulässt auch auf dem
                Gelände draußen statt. Der Wienerwald rundherum sorgt für
                angenehme Luft und ladet auf einen Spaziergang danach ein!
              </h5>
            </GridItem>
          </GridContainer>
          <h2 className={contactUsClasses.title}>
            Wir bieten Kurse in verschiedenen Sportarten
          </h2>
          <h5>
            Ob Klettern, Parkour, Selbstverteidigung, Tanzen, Tennis, Wildnis,
            wir bieten verschiedenste Kurse für Personen jeden Alters! Die
            Termine findet ihr bei den jeweiligen Kursen.
          </h5>
          <GridContainer justify="center">
            <Button
              key="navigate-to-courses-button"
              color="primary"
              onClick={() => history.push(props.location.pathname + '/alle')}
            >
              Zu den Kursen
            </Button>
          </GridContainer>
        </div>
      </div>
    </DivWithParallaxPaper>
  );
};

export default CoursesOverviewPage;
