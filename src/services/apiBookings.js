import PropTypes from "prop-types";
import { PAGE_SIZE } from "utils/globalConstants.js";
import { getToday } from "utils/helpers";
import supabase from "./supabase";

getBookings.propTypes = {
  filter: PropTypes.object,
  sortBy: PropTypes.string,
};

async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, guests_bookings(*, guests(firstName, lastName, email)), cabins(name)",
      { count: "exact" }
    );

  if (filter) query = query.eq(filter.field, filter.value);

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("No bookings found");
  }

  return { data, count };
}

async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests_bookings(*, guests(*)), cabins(*)")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  return data;
}

async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { error: guestsBookingsError } = await supabase
    .from("guests_bookings")
    .delete()
    .eq("bookingId", id);

  const { error: bookingsError } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id);

  if (guestsBookingsError || bookingsError) {
    console.error(guestsBookingsError || bookingsError);
    throw new Error("Booking could not be deleted");
  }
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// date needs to be ISOString
async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Date specific bookings could not be loaded");
  }

  return data;
}

// Returns all STAYS that were created after the given date
async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests_bookings(guestId, guests(firstName, lastName))")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Date specific stays could not be loaded.");
  }

  return data;
}

// Activity means that there is a check in or a check out today
async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "*,  guests_bookings(guestId, guests(firstName, lastName, nationality, countryFlag))"
    )
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Activity specific stays could not be loaded.");
  }
  return data;
}

export {
  deleteBooking,
  getBooking,
  getBookings,
  getBookingsAfterDate,
  getStaysAfterDate,
  getStaysTodayActivity,
  updateBooking,
};
