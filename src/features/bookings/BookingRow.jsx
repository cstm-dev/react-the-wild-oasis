import { format, isToday } from "date-fns";
import styled from "styled-components";

import Table from "ui/Table";
import Tag from "ui/Tag";

import useDeleteBooking from "features/bookings/useDeleteBooking.js";
import useCheckOut from "features/check_in_out/useCheckOut.js";
import PropTypes from "prop-types";
import React from "react";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "ui/ConfirmDelete.jsx";
import Menus from "ui/Menus.jsx";
import Modal from "ui/Modal.jsx";
import { formatCurrency, formatDistanceFromNow } from "utils/helpers";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:nth-child(odd) {
    font-weight: 500;
  }

  & span:nth-child(even) {
    color: var(--color-grey-500);
    font-size: 1.2rem;
    border-bottom: solid var(--color-grey-300) 1px;
    padding-bottom: 3px;
  }

  & span:last-child {
    border: none;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

BookingRow.propTypes = {
  booking: PropTypes.object,
};

function BookingRow({ booking }) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests_bookings,
    cabins: { name: cabinName },
  } = booking;
  const navigate = useNavigate();
  const { mutate: checkOut, isLoading: isCheckingOut } = useCheckOut();
  const { mutate: deleteBooking, isLoading: isDeletingBooking } =
    useDeleteBooking();

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        {guests_bookings.map((entry) => (
          <React.Fragment key={entry.id}>
            <span>{`${entry.guests.firstName} ${entry.guests.lastName}`}</span>
            <span>{entry.guests.email}</span>
          </React.Fragment>
        ))}
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />

          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check-In
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                disabled={isCheckingOut}
                onClick={() => checkOut(bookingId)}
              >
                Check-Out
              </Menus.Button>
            )}

            <Modal.Open modalWindowOpen="delete-booking">
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window modalWindowName="delete-booking">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeletingBooking}
            onConfirm={() => deleteBooking(bookingId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
