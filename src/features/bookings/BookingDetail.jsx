import styled from "styled-components";

import Button from "ui/Button";
import ButtonGroup from "ui/ButtonGroup";
import ButtonText from "ui/ButtonText";
import Heading from "ui/Heading";
import Row from "ui/Row";
import Tag from "ui/Tag";

import BookingDataBox from "features/bookings/BookingDataBox.jsx";
import useGetBooking from "features/bookings/useGetBooking.js";
import { useMoveBack } from "hooks/useMoveBack";
import Empty from "ui/Empty.jsx";
import Spinner from "ui/Spinner.jsx";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { data: booking, isLoading } = useGetBooking();
  const moveBack = useMoveBack();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;

  const { id: bookingId, status } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
