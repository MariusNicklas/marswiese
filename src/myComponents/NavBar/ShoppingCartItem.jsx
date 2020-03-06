import React, { useEffect } from "react";
// own components and functionality
import { getShoppingCart, deleteCampPseudoBooking } from "../../APIUtils";
// @material-ui/icons
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
// @material-ui/core components
import Badge from "@material-ui/core/Badge";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
// @material-ui/lab components
import Skeleton from "@material-ui/lab/Skeleton";
import { Button, TableHead, TableRow, TableCell } from "@material-ui/core";

const ShoppingCartItem = props => {
  const [open, setOpen] = React.useState(false);
  const [itemCount, setItemCount] = React.useState(0);
  const [items, setItems] = React.useState([]);
  const [cartPrice, setCartPrice] = React.useState(0);
  const [refreshCartToggle, setRefreshCartToggle] = React.useState(false);

  const handleCartOpen = event => {
    setOpen(true);
  };

  const handleCartClose = value => {
    setOpen(false);
  };

  const handleDeleteItem = async id => {
    await deleteCampPseudoBooking(id);
    setRefreshCartToggle(!refreshCartToggle);
  };

  useEffect(() => {
    (async getCart => {
      try {
        const response = await getShoppingCart();
        setItemCount(response.shopItemCount);
        setItems(response.campPseudoBookings);
        setCartPrice(response.totalPrice);
      } catch {}
    })();
  }, [refreshCartToggle]);

  return (
    <React.Fragment>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleCartOpen}
        color="inherit"
      >
        <Badge color="secondary" badgeContent={itemCount}>
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <Dialog open={open} onClose={handleCartClose}>
        <DialogTitle id="shopping-cart-dialog-title">
          Dein Warenkorb
        </DialogTitle>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                Details
              </TableCell>
              <TableCell>Aktionen</TableCell>
              <TableCell>Preis</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(item => (
              <TableRow key={item._id}>
                <TableCell>
                  <Skeleton variant="rect" width={150} height={90} />
                </TableCell>
                <TableCell>{item.kid.name}</TableCell>
                <TableCell>
                  <Button onClick={e => handleDeleteItem(item._id)}>
                    <DeleteOutlinedIcon />
                  </Button>
                </TableCell>
                <TableCell>{item.totalPrice}</TableCell>
              </TableRow>
            ))}
            {/* Final price of shopping cart, total of all items */}
            <TableRow>
              <TableCell align="center" colSpan={2} />
              <TableCell>Gesamtpreis</TableCell>
              <TableCell>{cartPrice}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Dialog>
    </React.Fragment>
  );
};

export default ShoppingCartItem;
