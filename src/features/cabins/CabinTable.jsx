import CabinRow from "features/cabins/CabinRow";
import useGetCabins from "features/cabins/useGetCabins.js";
import { useSearchParams } from "react-router-dom";
import Empty from "ui/Empty.jsx";
import Menus from "ui/Menus.jsx";
import Spinner from "ui/Spinner";
import Table from "ui/Table.jsx";

function CabinTable() {
  const { data: cabins, isLoading } = useGetCabins();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount") || "all";
  const sortValue = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortValue.split("-");
  let filteredCabins;

  if (filterValue === "all") {
    filteredCabins = cabins;
  } else if (filterValue === "no-discount") {
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  } else if (filterValue === "with-discount") {
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);
  }

  const sortModifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort(
    (a, b) => (a[field] - b[field]) * sortModifier
  );

  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resource="cabins" />;

  return (
    <Menus>
      <Table cols="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
