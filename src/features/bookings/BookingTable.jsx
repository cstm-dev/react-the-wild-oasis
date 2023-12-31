import BookingRow from "features/bookings/BookingRow.jsx";
import useGetBookings from "features/bookings/useGetBookings.js";
import Empty from "ui/Empty.jsx";
import Menus from "ui/Menus";
import Pagination from "ui/Pagination.jsx";
import Spinner from "ui/Spinner.jsx";
import Table from "ui/Table";

function BookingTable() {
  const { bookings, count, isLoading } = useGetBookings();

  if (isLoading) return <Spinner />;

  if (!bookings.length) return <Empty resource="bookings" />;

  return (
    <Menus>
      <Table cols="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guests</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination maxResults={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
