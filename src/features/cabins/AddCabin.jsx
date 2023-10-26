import CreateCabinForm from "features/cabins/CreateCabinForm.jsx";
import Button from "ui/Button.jsx";
import Modal from "ui/Modal.jsx";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open modalWindowOpen="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window modalWindowName="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
