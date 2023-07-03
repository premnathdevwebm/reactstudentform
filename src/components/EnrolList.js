import { useEffect } from "react";
import {DetailsList} from "@fluentui/react";
import styles from "./EnrolList.module.css";

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
];

let items = [];

const EnrolList = (props) => {
    useEffect(()=>{
        const curItemKey = props.studentDetails.key
        if(curItemKey){
            items = [...items, props.studentDetails]
            props.setStudentDetails({})
        }
    }, [props])
    console.log(items);
  return (
    <div className={styles.enrolList}>
      <DetailsList
        columns={columns}
        items={items}
      />
    </div>
  );
};

export default EnrolList;
