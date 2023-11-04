import useCheckOut from "features/check_in_out/useCheckOut.js";
import PropTypes from "prop-types";
import Button from "ui/Button";

CheckoutButton.propTypes = {
  bookingId: PropTypes.number,
};

function CheckoutButton({ bookingId }) {
  const { mutate: checkOut, isLoading: isCheckingOut } = useCheckOut();

  return (
    <Button
      $variation="primary"
      size="small"
      disabled={isCheckingOut}
      onClick={() => checkOut(bookingId)}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
