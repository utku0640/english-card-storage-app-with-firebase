import React, { useContext, useEffect, useState } from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [value, setValue] = useState("");
  const [categoryName, setCategoryName] = useState();
  const [categoryName_2, setCategoryName_2] = useState();
  const [changeWordList, setChangeWordList] = useState(false);
  const [changeWordList_2, setChangeWordList_2] = useState(false);
  const [isResponsiveSidebarOpen, setIsResponsiveSidebarOpen] = useState(true);

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      // setValue(data.user.uid);
      console.log(data);
      const dataObject = {
        fullName: data.user.displayName,
        firstName: data._tokenResponse.firstName,
        lastName: data._tokenResponse.lastName,
        uid: data.user.uid,
        image: data.user.photoURL,
        email: data.user.email,
      };
      console.log(data);
      localStorage.setItem("user_data", JSON.stringify(dataObject));
      window.location.reload();
    });
  };
  useEffect(() => {
    setValue(JSON.parse(localStorage.getItem("user_data")));
  }, []);
  const singOutHandler = () => {
    localStorage.clear("user_data");
    window.location.reload();
  };

  const handleCategory = (category) => {
    setCategoryName(category);
  };
  const handleCategory_2 = (category_2) => {
    setCategoryName_2(category_2);
  };
  const toggleWordList = () => {
    setChangeWordList(true);
    setChangeWordList_2(false);
  };
  const toggleWordList_2 = () => {
    setChangeWordList_2(true);
    setChangeWordList(false);
  };
  const openResponsiveSidebar = () => {
    setIsResponsiveSidebarOpen(!isResponsiveSidebarOpen);
  };

  return (
    <AppContext.Provider
      value={{
        handleClick,
        singOutHandler,
        value,
        setValue,
        handleCategory,
        categoryName,
        handleCategory_2,
        categoryName_2,
        toggleWordList,
        changeWordList,
        toggleWordList_2,
        changeWordList_2,
        openResponsiveSidebar,
        isResponsiveSidebarOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
