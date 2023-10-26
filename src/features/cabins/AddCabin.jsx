import CabinTable from "features/cabins/CabinTable.jsx";
import CreateCabinForm from "features/cabins/CreateCabinForm.jsx";
import Button from "ui/Button.jsx";
import Modal from "ui/Modal.jsx";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open modalWindowOpen="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window modalWindowName="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      <Modal.Open modalWindowOpen="cabin-table">
        <Button>Show cabin table</Button>
      </Modal.Open>
      <Modal.Window modalWindowName="cabin-table">
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
