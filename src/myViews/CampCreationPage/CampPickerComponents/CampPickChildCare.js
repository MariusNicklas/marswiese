import React, { useContext } from "react";
import { FormControlLabel, FormGroup } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import CampCreationContext from "../CampCreationContext";

const CampPickChildCare = () => {
  const { state, dispatch } = useContext(CampCreationContext);

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            id="toggle-morning-care"
            checked={state.morningCare}
            onChange={e =>
              dispatch({
                type: "field-change",
                field: "morningCare",
                value: e.target.checked
              })
            }
            color="primary"
          />
        }
        label="vormittags"
      />

      <FormControlLabel
        control={
          <Switch
            id="toggle-afternoon-care"
            checked={state.afternoonCare}
            onChange={e =>
              dispatch({
                type: "field-change",
                field: "afternoonCare",
                value: e.target.checked
              })
            }
            color="primary"
          />
        }
        label="nachmittags"
      />
    </FormGroup>
  );
};

export default CampPickChildCare;
