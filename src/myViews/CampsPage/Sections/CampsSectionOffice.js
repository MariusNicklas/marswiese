import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import officeStyle from "assets/jss/material-kit-pro-react/views/aboutUsSections/officeStyle.js";
import Card from "components/Card/Card.js";

import tennisPic from "assets/img/camps/tennis.jpg";
import cherleedingPic from "assets/img/camps/cherleeding.jpg";
import kletternPic from "assets/img/camps/klettern.jpg";
import fussballPic from "assets/img/camps/fussball.jpg";
import wildnisPic from "assets/img/camps/wildnis.jpg";

import CardBody from "components/Card/CardBody.js";

// office

const useStyles = makeStyles(officeStyle);

export default function SectionOffice() {
  const classes = useStyles();

  React.useEffect(() => {
    if (window) {
      window.addEventListener("resize", addStylesForRotatingCards);
    }
    addStylesForRotatingCards();
    return function cleanup() {
      if (window) {
        window.removeEventListener("resize", addStylesForRotatingCards);
      }
    };
  });
  const addStylesForRotatingCards = () => {
    var rotatingCards = document.getElementsByClassName(classes.cardRotate);
    for (let i = 0; i < rotatingCards.length; i++) {
      var rotatingCard = rotatingCards[i];
      var cardFront = rotatingCard.getElementsByClassName(classes.front)[0];
      var cardBack = rotatingCard.getElementsByClassName(classes.back)[0];
      cardFront.style.height = "unset";
      cardFront.style.width = "unset";
      cardBack.style.height = "unset";
      cardBack.style.width = "unset";
      var rotatingWrapper = rotatingCard.parentElement;
      var cardWidth = rotatingCard.parentElement.offsetWidth;
      var cardHeight = rotatingCard.children[0].children[0].offsetHeight;
      rotatingWrapper.style.height = cardHeight + "px";
      rotatingWrapper.style["margin-bottom"] = 30 + "px";
      cardFront.style.height = "unset";
      cardFront.style.width = "unset";
      cardBack.style.height = "unset";
      cardBack.style.width = "unset";
      cardFront.style.height = cardHeight + 35 + "px";
      cardFront.style.width = cardWidth + "px";
      cardBack.style.height = cardHeight + 35 + "px";
      cardBack.style.width = cardWidth + "px";
    }
  };

  return (
    <div className={classes.office}>
      <GridContainer>
        <GridItem
          md={8}
          sm={8}
          className={classNames(
            classes.mlAuto,
            classes.mrAuto,
            classes.textCenter
          )}
        >
          <h2 className={classes.title}>
            Sieh dir diese großartigen Camps an!
          </h2>
          <h5 className={classes.description}>
            Nirgendwo in Wien erwarten dich soviele Möglichkeiten
          </h5>
        </GridItem>
      </GridContainer>
      <br />
      <GridContainer>
        <GridItem xs={12} sm={6} md={6} lg={4}>
          <div className={classes.rotatingCardContainer}>
            <Card background className={classes.cardRotate}>
              <div
                className={classes.front + " " + classes.wrapperBackground}
                style={{
                  backgroundImage: `url(${cherleedingPic})`
                }}
              >
                <CardBody background className={classes.cardBodyRotate}>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <h3 className={classes.cardTitleWhite}>Cherleeding</h3>
                  </a>
                  <p className={classes.cardDescriptionWhite}>
                    Hier werden Elemente des Turnens, der Akrobatik und des
                    Tanzens verbunden. Gemeinsam als Squad (Team) lernt ihr was
                    es heißt Chants zu rufen, Jumps zu üben oder sich im
                    Tumbling auszutoben.
                  </p>
                </CardBody>
              </div>
              <div
                className={classes.back + " " + classes.wrapperBackground}
                style={{
                  backgroundImage: `url(${cherleedingPic})`
                }}
              >
                <CardBody background className={classes.cardBodyRotate}>
                  <h5 className={classes.cardTitleWhite}>
                    Perfekte Vorbereitung
                  </h5>
                  <p className={classes.cardDescriptionWhite}>
                    Um in einen perfekten Cheerleadingtag zu starten wird immer
                    spielerisch aufgewärmt, gedehnt und Körperspannung
                    aufgebaut. Danach erlernt ihr fit und warm alle
                    Basisübungen, Techniken, Sprünge und Tanzelemente die ihr
                    für eure Show bei der Abschlussveranstaltung braucht.
                    Bodenturnen und akrobatische Pyramiden dürfen dabei
                    natürlich auf keinen Fall fehlen. Also ran an die Pompoms!
                  </p>
                  <div className={classes.textCenter}></div>
                </CardBody>
              </div>
            </Card>
          </div>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={4}>
          <div className={classes.rotatingCardContainer}>
            <Card background className={classes.cardRotate}>
              <div
                className={classes.front + " " + classes.wrapperBackground}
                style={{
                  backgroundImage: `url(${wildnisPic})`
                }}
              >
                <CardBody background className={classes.cardBodyRotate}>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <h3 className={classes.cardTitleWhite}>Wildnis</h3>
                  </a>
                  <p className={classes.cardDescriptionWhite}>
                    Lerne von den Fertigkeiten der alten Jäger- und
                    Sammlergesellschaften. Rund ums Sportzentrum erlebt ihr den
                    Erfahrungsraum Natur mit all euren Sinnen.
                  </p>
                </CardBody>
              </div>
              <div
                className={classes.back + " " + classes.wrapperBackground}
                style={{
                  backgroundImage: `url(${wildnisPic})`
                }}
              >
                <CardBody background className={classes.cardBodyRotate}>
                  <h5 className={classes.cardTitleWhite}>
                    Lerne die Natur kennen
                  </h5>
                  <p className={classes.cardDescriptionWhite}>
                    Im Wildniscamp spielt die Natur in der ihr lebt die
                    wichtigste Rolle. Ihr werdet mit Sinnesspielen und
                    Geschicklichkeitsaufgaben in die Wildnis eingeführt und habt
                    den ganzen Tag Zeit um euch in eurem Umfeld zurecht zu
                    finden. Damit ihr euch mit euren vier Grundbedürfnissen
                    (Wärme, Wasser, Nahrung und Schlaf) in der Natur rund um
                    wohl fühlt, werdet ihr abseits der Wege viele Tipps und
                    Tricks bekommen, die ihr auch im alltäglichen Leben gut
                    brauchen werdet.
                  </p>
                  <div className={classes.textCenter}></div>
                </CardBody>
              </div>
            </Card>
          </div>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={4}>
          <div className={classes.rotatingCardContainer}>
            <Card background className={classes.cardRotate}>
              <div
                className={classes.front + " " + classes.wrapperBackground}
                style={{
                  backgroundImage: `url(${tennisPic})`
                }}
              >
                <CardBody background className={classes.cardBodyRotate}>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <h3 className={classes.cardTitleWhite}>Tennis</h3>
                  </a>
                  <p className={classes.cardDescriptionWhite}>
                    Hier lernt ihr die Basics von Vor- und Rückhand bis hin zum
                    Service und Smashen. Bei Matches könnt ihr zeigen, was ihr
                    drauf habt.
                  </p>
                </CardBody>
              </div>
              <div
                className={classes.back + " " + classes.wrapperBackground}
                style={{
                  backgroundImage: `url(${tennisPic})`
                }}
              >
                <CardBody background className={classes.cardBodyRotate}>
                  <h5 className={classes.cardTitleWhite}>
                    Verbessert euch täglich
                  </h5>
                  <p className={classes.cardDescriptionWhite}>
                    Spielerisches Aufwärmen ist vor jedem Camptag ein wichtiger
                    Einstieg. Ihr werdet Grundschläge lernen und verbessern und
                    später beim Techniktraining immer besser werden. Auch
                    Kondition und Koordination kommen im Tenniscamp nicht zu
                    kurz. Zum Abschluss könnt ihr bei einem Match zeigen was ihr
                    alles gerlernt habt. Auf die ersten Drei wartet wie bei
                    einem richtigen Tennistunier üblich, ein Pokal.
                  </p>
                  <div className={classes.textCenter}></div>
                </CardBody>
              </div>
            </Card>
          </div>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={6}>
          <div className={classes.rotatingCardContainer}>
            <Card background className={classes.cardRotate}>
              <div
                className={classes.front + " " + classes.wrapperBackground}
                style={{
                  backgroundImage: `url(${kletternPic})`
                }}
              >
                <CardBody background className={classes.cardBodyRotate}>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <h3 className={classes.cardTitleWhite}>Klettern</h3>
                  </a>
                  <p className={classes.cardDescriptionWhite}>
                    In der Kletterhalle werdet ihr sowohl im Boulderbereich als
                    auch an der Kletterwand euren Spaß haben – egal ob ihr
                    Anfänger seid oder bereits fortgeschritten. Wagt euch in die
                    Vertikale!
                  </p>
                </CardBody>
              </div>
              <div
                className={classes.back + " " + classes.wrapperBackground}
                style={{
                  backgroundImage: `url(${kletternPic})`
                }}
              >
                <CardBody background className={classes.cardBodyRotate}>
                  <h5 className={classes.cardTitleWhite}>
                    Anfänger/Fortgeschrittene/Experten
                  </h5>
                  <p className={classes.cardDescriptionWhite}>
                    Nach dem spielerischen Aufwärmen werdet ihr eure Kraft,
                    Dynamik und Technik auf verschiedenste Art und Weise
                    verbessern. Um euch gegenseitig sichern zu können werdet ihr
                    lernen wie ein Sicherungsgerät richtig bedient wird. Ihr
                    werdet eure eigenen Grenzen kennenlernen und gegenseitiges
                    Vertrauen stärken.
                  </p>
                  <div className={classes.textCenter}></div>
                </CardBody>
              </div>
            </Card>
          </div>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={6}>
          <div className={classes.rotatingCardContainer}>
            <Card background className={classes.cardRotate}>
              <div
                className={classes.front + " " + classes.wrapperBackground}
                style={{
                  backgroundImage: `url(${fussballPic})`
                }}
              >
                <CardBody background className={classes.cardBodyRotate}>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <h3 className={classes.cardTitleWhite}>Fussball</h3>
                  </a>
                  <p className={classes.cardDescriptionWhite}>
                    In den Fußballcamps stehen vor allem Spiel und Spaß im
                    Mittelpunkt. Von euren Trainern bekommt ihr hilfreiche Tipps
                    und Tricks für eure Technik und Taktik, sie achten aber
                    stets darauf, dass Fairplay und Teamgeist nicht zu kurz
                    kommen.
                  </p>
                </CardBody>
              </div>
              <div
                className={classes.back + " " + classes.wrapperBackground}
                style={{
                  backgroundImage: `url(${fussballPic})`
                }}
              >
                <CardBody background className={classes.cardBodyRotate}>
                  <h5 className={classes.cardTitleWhite}>Ein super Training</h5>
                  <p className={classes.cardDescriptionWhite}>
                    Wir arbeiten mit der „Spielen-Trainieren-Spielen“ – Methode.
                    Am Beginn eines spannenden Fußballtags steht immer ein
                    spielerisches und abwechslungsreiches Aufwärmen. Danach
                    versuchen wir gemeinsam eure fußballerischen Fähigkeiten und
                    Techniken zu verbessern – Schießen, Passen, Kopfball aber
                    auch das Verhalten als Stürmer oder Verteidiger. Im Spiel
                    könnt ihr eure erlernten Fähigkeiten dann gleich anwenden
                    und lernt gemeinsam in der Gruppe fair mit anderen
                    umzugehen, denn sowohl Sieg als auch Niederlage gehören
                    dazu.
                  </p>
                  <div className={classes.textCenter}></div>
                </CardBody>
              </div>
            </Card>
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
}
