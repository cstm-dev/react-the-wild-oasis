import styled from "styled-components";

import Button from "ui/Button";
import ButtonGroup from "ui/ButtonGroup";
import ButtonText from "ui/ButtonText";
import Heading from "ui/Heading";
import Row from "ui/Row";
import Tag from "ui/Tag";

import BookingDataBox from "features/bookings/BookingDataBox.jsx";
import useGetBooking from "features/bookings/useGetBooking.js";
import useCheckOut from "features/check_in_out/useCheckOut.js";
import { useMoveBack } from "hooks/useMoveBack";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Empty from "ui/Empty.jsx";
import Spinner from "ui/Spinner.jsx";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { data: booking, isLoading } = useGetBooking();
  const { mutate: checkOut } = useCheckOut();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
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
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check-In
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkOut(bookingId)}
          >
            Check-Out
          </Button>
        )}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
