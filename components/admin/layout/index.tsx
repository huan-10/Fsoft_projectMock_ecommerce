import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import SideBar from "./sidebar";
import { useDispatch, useSelector } from "react-redux";
import { hideDialog } from "@/store/DialogSlice";
import DialogModal from "@/components/dialogModal";
export default function Layout({ children }) {
  const { expandSidebar } = useSelector((state) => ({ ...state }));
  const showSidebar = expandSidebar.expandSidebar;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hideDialog());
  }, []);
  return (
    <div className={styles.layout}>
      <DialogModal />
      <SideBar />
      <div
        style={{ marginLeft: `${showSidebar ? "280px" : "80px"}` }}
        className={styles.layout__main}
      >
        {children}
      </div>
    </div>
  );
}
