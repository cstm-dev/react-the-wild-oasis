import BookingDataBox from "features/bookings/BookingDataBox";
import styled from "styled-components";

import Button from "ui/Button";
import ButtonGroup from "ui/ButtonGroup";
import ButtonText from "ui/ButtonText";
import Heading from "ui/Heading";
import Row from "ui/Row";

import useGetBooking from "features/bookings/useGetBooking.js";
import useCheckIn from "features/check_in_out/useCheckIn.js";
import useGetSettings from "features/settings/useGetSettings.js";
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
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { mutate: checkIn, isLoading: isCheckingIn } = useCheckIn();
  const { data: settings, isLoading: isLoadingSettings } = useGetSettings();

  useEffect(() => {
    setIsPaid(booking?.hasPaid ?? false);
  }, [booking?.hasPaid]);

  if (!booking) return <Empty resource="booking" />;
  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    cabins: { name },
    guests_bookings,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  const staticBreakfastPrice = settings.breakfastPrice * numGuests * numNights;

  function handleCheckIn() {
    if (!isPaid) return;

    if (addBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: staticBreakfastPrice,
          totalPrice: totalPrice + staticBreakfastPrice,
        },
      });
    } else {
      checkIn({ bookingId });
    }
  }

  function handleBreakfast() {
    setAddBreakfast((add) => !add);
    setIsPaid(false);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={handleBreakfast}
            id="addBreakfast"
          >
            Add Breakfast for {formatCurrency(staticBreakfastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={isPaid}
          onChange={() => setIsPaid((pay) => !pay)}
          id="confirmPayment"
          disabled={isPaid}
        >
          Cabin #{name} rented by
          {`${guests_bookings.at(0).guests.firstName} ${
            guests_bookings.at(0).guests.lastName
          } `}
          has been paid for the total amount of{" "}
          {formatCurrency(totalPrice + staticBreakfastPrice * addBreakfast)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckIn} disabled={!isPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
