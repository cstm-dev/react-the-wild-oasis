import Filter from "ui/Filter";
import SortBy from "ui/SortBy";
import TableOperations from "ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterParamName="status"
        filterOptions={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        sortOptions={[
          { value: "startDate-asc", label: "Sort by date (ascending)" },
          { value: "startDate-desc", label: "Sort by date (descending)" },
          { value: "totalPrice-asc", label: "Sort by amount (low to high)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high to low)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
