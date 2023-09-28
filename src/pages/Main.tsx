import { FC, useEffect, useState } from "react";
import Categories from "../components/categories/Categories";
import Navbar from "../components/navbar/Navbar";
import SaleList from "../components/saleList/SaleList";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { checkAuth } from "../store/UserSlice";
import styles from "/src/styles/Main.module.sass";

const Main: FC = () => {
  const sales = useAppSelector((state) => state.saleSlice.sales);
  const dispatch = useAppDispatch();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const setCurrentCategory = (category: string) => {
    setActiveCategory(category);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) dispatch(checkAuth());
  }, []);

  return (
    <div className={styles.container}>
      <Navbar></Navbar>
      <Categories setCurrentCategory={setCurrentCategory}></Categories>

      <SaleList
        sales={
          sales &&
          sales.filter((sale) => sale.categories.includes(activeCategory))
        }
      ></SaleList>
    </div>
  );
};

export default Main;
