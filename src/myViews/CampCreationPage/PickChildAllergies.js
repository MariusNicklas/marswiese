import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Select,
  MenuItem,
  Grid,
  InputLabel,
  FormControl
} from '@material-ui/core/';
import CustomInput from 'components/CustomInput/CustomInput';
import CampCreationContext from './CampCreationContext';
// styles
import campsStyle from 'assets/jss/material-kit-pro-react/views/campsStyle.js';
import basicsStyle from 'assets/jss/material-kit-pro-react/views/componentsSections/basicsStyle.js';

const campStyles = makeStyles(campsStyle);
const basicStyles = makeStyles(basicsStyle);

const allergenics = [
  'Gluten',
  'Krebstiere',
  'Eier',
  'Fisch',
  'Erdnüsse',
  'Soja',
  'Milch',
  'Schalenfrüchte',
  'Sellerie',
  'Senf',
  'Sesam',
  'Schwefeldioxid',
  'Lupinen',
  'Weichtiere, Muscheln, Tintenfisch'
];

const PickChildAllergies = () => {
  const campClasses = campStyles();
  const basicClasses = basicStyles();

  const { state, dispatch } = useContext(CampCreationContext);

  return (
    <Grid container>
      {/* GRID ITEM 1 - SELECT ALLERGIES */}
      <Grid item xs={12} md={12}>
        <FormControl style={{ minWidth: '100%' }}>
          <InputLabel>Allergien</InputLabel>
          <Select
            className={campClasses.selectField}
            multiple
            fullWidth
            value={state.allergies}
            onChange={e =>
              dispatch({
                type: 'field-change',
                field: 'allergies',
                value: e.target.value
              })
            }
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
            <MenuItem value="none" disabled>
              Allergie auswählen
            </MenuItem>
            {allergenics.map(allergenic => (
              <MenuItem
                key={allergenic}
                value={allergenic}
                classes={{
                  root: basicClasses.selectMenuItem,
                  selected: basicClasses.selectMenuItemSelectedMultiple
                }}
              >
                {allergenic}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* GRID ITEM 2 - INPUT DISEASES */}
      <Grid item key="diseases-input-grid-item" xs={12} md={6}>
        <CustomInput
          id="diseases-input"
          value={state.diseases}
          labelText="Krankheiten/weitere Allergien"
          onChange={e =>
            dispatch({
              type: 'field-change',
              field: 'diseases',
              value: e.target.value
            })
          }
        />
      </Grid>

      {/* GRID ITEM 3 - INPUT DISEASE MEASURES */}
      <Grid item key="measures-input-grid-item" xs={12} md={6}>
        <CustomInput
          id="measures-input"
          value={state.measures}
          labelText="Maßnahmen"
          onChange={e =>
            dispatch({
              type: 'field-change',
              field: 'measures',
              value: e.target.value
            })
          }
        />
      </Grid>
    </Grid>
  );
};

export default PickChildAllergies;
