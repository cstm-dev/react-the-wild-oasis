import CheckoutButton from "features/check_in_out/CheckoutButton.jsx";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "ui/Button.jsx";
import { Flag } from "ui/Flag.jsx";
import Tag from "ui/Tag.jsx";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

TodayItem.propTypes = {
  activity: PropTypes.object,
};

function TodayItem({ activity }) {
  const { id, status, guests_bookings, numNights } = activity;
  const firstGuest = guests_bookings.at(0);

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <Flag
        src={firstGuest.guests.countryFlag}
        alt={`Flag of ${firstGuest.guests.nationality}`}
      />

      <Guest>{`${firstGuest.guests.lastName}, ${firstGuest.guests.firstName}`}</Guest>
      <div>{numNights} nights</div>

      {status === "unconfirmed" && (
        <Button
          size="small"
          $variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check In
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
