import { useEffect, useState } from "react";
import { DetailsList } from "@fluentui/react";
import { MdEdit, MdDelete } from "react-icons/md";
import styles from "./EnrolList.module.css";
import ModalComp from "./ModalComp";
const EnrolList = (props) => {
  const columns = [
    {
      key: "fname",
      name: "First Name",
      fieldName: "fname",
      minWidth: 190,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "lname",
      name: "Last Name",
      fieldName: "lname",
      minWidth: 190,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "program",
      name: "Program",
      fieldName: "program",
      minWidth: 60,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "email",
      name: "Email",
      fieldName: "email",
      minWidth: 130,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "actions",
      name: "Actions",
      fieldName: "actions",
      minWidth: 50,
      maxWidth: 50,
      isResizable: false,
      onRender: (item) => (
        <div>
          <MdEdit
            style={{ cursor: "pointer" }}
            onClick={() => handleEdit(item)}
          />
          <MdDelete
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(item)}
          />
        </div>
      ),
    },
  ];

  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);


  useEffect(() => {
    if (props.studentDetails.key) {
      setItems((prevItems) => [...prevItems, props.studentDetails]);
      props.setStudentDetails({});
    }
  }, [props]);

  const closeModal = () => {
    setModalOpen(false);
  };
  const confirmModal = () => {
    setModalOpen(false);
  };

  function handleEdit(item) {
    setModalOpen(true);
    const updatedItems = items.map((i) => {
      if (i.key === item.key) {
        return {
          ...i,
          fname: "Updated First Name",
          lname: "Updated Last Name",
          program: "Updated Program",
          email: "updated@example.com",
        };
      }
      return i;
    });
    setSelectedItem(item);
    setItems(updatedItems);
    updateToForm(item);
  }

  function handleDelete(item) {
    const updatedItems = items.filter((i) => i.key !== item.key);
    setItems(updatedItems);
    restoreSeat(item.program);
  }

  function restoreSeat(pgm) {
    pgm === "UG"
      ? props.setUgSeat((prev) => prev + 1)
      : props.setPgSeat((prev) => prev + 1);
  }

  function updateToForm(item) {
    props.dataToEnrolForm(item);
  }

  return (
    <div className={styles.enrolList}>
      <DetailsList columns={columns} items={items} />
      {modalOpen && (
        <ModalComp>
          <h1>Update Student Detail</h1>
          <input
            type="text"
            value={selectedItem.fname}
            onChange={(e) =>
              setSelectedItem((prevItem) => ({
                ...prevItem,
                fname: e.target.value,
              }))
            }
          />
          <input
            type="text"
            value={selectedItem.lname}
            onChange={(e) =>
              setSelectedItem((prevItem) => ({
                ...prevItem,
                lname: e.target.value,
              }))
            }
          />
          <input
            type="email"
            value={selectedItem.email}
            onChange={(e) =>
              setSelectedItem((prevItem) => ({
                ...prevItem,
                email: e.target.value,
              }))
            }
          />
          <button onClick={confirmModal}>Confirm</button>
          <button onClick={closeModal}>Close</button>
        </ModalComp>
      )}
    </div>
  );
};

export default EnrolList;
