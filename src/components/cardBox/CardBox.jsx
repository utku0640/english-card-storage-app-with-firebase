import React, { useEffect, useState } from "react";
import styles from "./cardBox.module.css";
import { useGlobalContext } from "../../Context";
import ChildrenList from "../childrenList/ChildrenList";
import { doc, setDoc } from "firebase/firestore";
import db from "../../firebase";
import { v4 as uuidv4 } from "uuid";

const CardBox = () => {
  const { value, categoryName } = useGlobalContext();

  const [data, setData] = useState({});
  const [value_3, setValue_3] = useState();
  useEffect(() => {
    setValue_3(JSON.parse(localStorage.getItem("user_data")));
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const sameUUID = uuidv4();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.englishWord && data.turkishWord) {
      const docRef = doc(
        db,
        `users/${value.uid}/children/${categoryName}/children2/${sameUUID}`
      );

      await setDoc(docRef, {
        englishWord: data.englishWord,
        turkishWord: data.turkishWord,
        uuid: sameUUID,
      });
      setData({ englishWord: "", turkishWord: "" });
    }
    e.target.reset();
  };

  return (
    <div className={styles.cardBox_container}>
      <ChildrenList
        data={data}
        setData={setData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        path={`users/${
          value_3 && value_3.uid
        }/children/${categoryName}/children2`}
      />
    </div>
  );
};

export default CardBox;
