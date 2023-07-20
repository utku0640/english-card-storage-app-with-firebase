import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc, orderBy } from "firebase/firestore";
import db from "../../firebase";
import { useGlobalContext } from "../../Context";
import styles from "./childreList.module.css";
import { PiDotsThreeOutlineVerticalDuotone } from "react-icons/pi";
import { GoTrash } from "react-icons/go";
import { useState } from "react";
import { ImPlus } from "react-icons/im";
import ReactLoading from "react-loading";
import ResponsiveSidebar from "../responsiveSidebar/ResponsiveSidebar";

const ChildrenList = ({ path, handleChange, handleSubmit, data }) => {
  const {
    value,
    categoryName,
    categoryName_2,
    changeWordList,
    changeWordList_2,
  } = useGlobalContext();
  const [openWritingPart, setOpenWritingPart] = useState(false);

  const funcWritingPart = () => {
    setOpenWritingPart(!openWritingPart);
  };
  const query = collection(db, path);
  const [docs, loading, error] = useCollectionData(query);

  const query_2 = collection(db, `default_data/${categoryName_2}/children`);

  const [docs_2, loading_2, error_2] = useCollectionData(query_2);
  const handleDeleteSubCollection = async (uuid) => {
    await deleteDoc(
      doc(db, `users/${value.uid}/children/${categoryName}/children2/${uuid}`)
    );
  };
  const handleClickChangeEverything = (eng, tr, event) => {
    if (event.currentTarget.classList) {
      event.currentTarget.classList.toggle(
        styles.container_single_card_changing
      );
    }
    if (event.currentTarget.children[0].innerText === `${eng}`) {
      event.currentTarget.children[0].innerText = `${tr}`;
    } else {
      event.currentTarget.children[0].innerText = `${eng}`;
    }
    if (event.currentTarget) {
      if (event.detail === 3) {
        event.currentTarget.children[1].classList.toggle(
          styles.delete_button_active
        );
      }
    }
  };

  return (
    <div className={styles.container}>
      <ResponsiveSidebar />
      {changeWordList && (
        <div>
          <button onClick={funcWritingPart} className={styles.button_29}>
            <ImPlus />
          </button>
          {openWritingPart ? (
            <div>
              <form onSubmit={handleSubmit} className={styles.form_div}>
                <input
                  placeholder="English Word"
                  name="englishWord"
                  onChange={handleChange}
                  value={data.englishWord}
                />
                <input
                  placeholder="Turkish Word"
                  name="turkishWord"
                  onChange={handleChange}
                  value={data.turkishWord}
                />
                <div className={styles.button_add}>
                  <button className={styles.button_29} type="submit">
                    Add
                  </button>
                </div>
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
      )}

      <div className={styles.container_card}>
        {changeWordList &&
          docs?.map((item, index) => {
            return (
              <div>
                <div
                  onClick={(event) =>
                    handleClickChangeEverything(
                      item.turkishWord,
                      item.englishWord,
                      event
                    )
                  }
                  className={styles.container_single_card}
                  key={index}
                >
                  <div className={styles.word_part}>{item.englishWord}</div>

                  <button
                    className={styles.delete_button}
                    onClick={() => handleDeleteSubCollection(item.uuid)}
                  >
                    <GoTrash />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      {/* ------------------------------------------------------------ */}
      <div className={styles.container_card}>
        {changeWordList_2 &&
          docs_2?.map((item, index) => {
            return (
              <div
                onClick={(event) =>
                  handleClickChangeEverything(
                    item.turkishWord,
                    item.englishWord,
                    event
                  )
                }
                className={styles.container_single_card}
                key={index}
              >
                {/* First Child */}
                <div className={styles.word_part}>{item.englishWord}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ChildrenList;
