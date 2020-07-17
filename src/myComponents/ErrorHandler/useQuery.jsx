// found on https://itnext.io/centralizing-api-error-handling-in-react-apps-810b2be1d39d

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export const useQuery = ({ apifunc }) => {
  const history = useHistory();
  const [apiData, setApiData] = useState();

  useEffect(() => {
    apifunc()
      //.then(data => data.json())
      .then(({ status, ...apiData }) => {
        if (status > 400) {
          history.replace(history.location.pathname, {
            errorStatus: status
          });
        } else {
          console.log('setting api data to:');
          console.log(apiData);
          setApiData(apiData);
        }
      });
  }, [apifunc]);

  return { data: apiData };
};
