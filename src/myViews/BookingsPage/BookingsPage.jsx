import React, { useState, useEffect } from "react";
import { getMyCampBookings, getCampById } from "../../APIUtils";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@material-ui/core";

const BookingsPage = () => {
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
      <React.Fragment>
        <h1>Meine Buchungen</h1>;
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Erstellt am</TableCell>
              <TableCell>Camps</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {myCampBookings.map((campBooking) => (
              <TableRow key={campBooking._id}>
                <TableCell>Feriencamp für {campBooking.kid.name}</TableCell>
                <TableCell>{campBooking.createdAt}</TableCell>
                <TableCell>
                  {campBooking.campNames[0]}, {campBooking.campNames[1]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
};

export default BookingsPage;
