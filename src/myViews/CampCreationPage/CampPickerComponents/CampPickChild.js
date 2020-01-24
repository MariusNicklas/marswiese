import React from "react";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";
import CampCreateChildPersonalData from "./CampCreateChildPersonalData";

const CampPickChild = () => {
  const [name, setName] = React.useState("");

  const handleChange = e => {
    switch (e.target.value) {
      case "user":
        setName("user");
        break;
      case "new child":
        setName("new child");
        break;
      default:
    }
  };

  return (
    <React.Fragment>
      <Select id="select-child-dropdown" value={name} onChange={handleChange}>
        <MenuItem value={"user"}>User</MenuItem>
        <MenuItem value={"new child"}>Neues Kind hinzufügen</MenuItem>
      </Select>
      {name === "new child" && <CampCreateChildPersonalData />}
    </React.Fragment>
  );
};

export default CampPickChild;
