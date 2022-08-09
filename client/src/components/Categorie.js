import "../App.css";
import { categories } from "./data/CategorieItems";
import React from "react";
import CategorieItem from "./CategorieItem";

const Categorie = () => {
  return (
    <>
      <h1 style={{ justifyContent: "center" }}> OUR COLLECTIONS</h1>
      <div className="categories">
        {categories.map((item) => (
          <CategorieItem
            season={item.season}
            key={item.id}
            title={item.title}
            img={item.img}
          />
        ))}
      </div>
    </>
  );
};

export default Categorie;
