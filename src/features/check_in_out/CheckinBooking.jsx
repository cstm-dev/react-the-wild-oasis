import BookingDataBox from "features/bookings/BookingDataBox";
import styled from "styled-components";

import Button from "ui/Button";
import ButtonGroup from "ui/ButtonGroup";
import ButtonText from "ui/ButtonText";
import Heading from "ui/Heading";
import Row from "ui/Row";

import useGetBooking from "features/bookings/useGetBooking.js";
import useCheckIn from "features/check_in_out/useCheckIn.js";
import { useMoveBack } from "hooks/useMoveBack";
import { useEffect, useState } from "react";
import Checkbox from "ui/Checkbox.jsx";
import Empty from "ui/Empty.jsx";
import Spinner from "ui/Spinner.jsx";
import { formatCurrency } from "utils/helpers.js";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { data: booking, isLoading } = useGetBooking();
  const moveBack = useMoveBack();
  const [isPaid, setIsPaid] = useState(false);
  const { mutate: checkIn, isLoading: isCheckingIn } = useCheckIn();

  useEffect(() => {
    setIsPaid(booking?.hasPaid ?? false);
  }, [booking?.hasPaid]);

  if (!booking) return <Empty resource="booking" />;
  if (isLoading) return <Spinner />;

  const {
    id: bookingId,
    cabins: { name },
    guests_bookings,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  function handleCheckIn() {
    if (!isPaid) return;

    checkIn(bookingId);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={isPaid}
          onChange={() => setIsPaid(!isPaid)}
          id="confirmPayment"
          disabled={booking.hasPaid || isCheckingIn}
        >
          Cabin #{name} rented by
          {`${guests_bookings.at(0).guests.firstName} ${
            guests_bookings.at(0).guests.lastName
          } `}
          has been paid for the total amount of {formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckIn} disabled={!isPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
