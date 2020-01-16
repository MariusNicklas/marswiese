import React from "react";
import { withRouter } from "react-router-dom";
import Card from "../components/Card/Card";

const myCard = props => {
  const { onClickHandler, ...rest } = props;
  return (
    <div onClick={onClickHandler}>
      <Card {...rest} />
    </div>
  );
};

export default withRouter(myCard);
