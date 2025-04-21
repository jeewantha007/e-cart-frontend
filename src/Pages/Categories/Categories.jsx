import React from "react";
import { useNavigate } from "react-router-dom";
import "./categories.css";

const categories = [
  {
    title: "Clothing",
    image: "https://img.freepik.com/free-photo/shop-clothing-clothes-shop-hanger-modern-shop-boutique_1150-8886.jpg?semt=ais_hybrid&w=740",
    link: "/dashboard/clothing",
  },
  {
    title: "Electronics",
    image: "https://media.istockphoto.com/id/1211554164/photo/3d-render-of-home-appliances-collection-set.jpg?s=612x612&w=0&k=20&c=blm3IyPyZo5ElWLOjI-hFMG-NrKQ0G76JpWGyNttF8s=",
    link: "/dashboard/electronics",
  },
  {
    title: "Home & Kitchen",
    image: "https://gembah.com/wp-content/uploads/2022/07/home-kitchen-gadgets-scaled-1.jpeg",
    link: "/dashboard/home-kitchen",
  },
  {
    title: "Footwear",
    image: "https://media.istockphoto.com/id/1152527286/photo/boutique-shoes-in-a-store.jpg?s=612x612&w=0&k=20&c=-_8nvBm9UrJW65mZxROh7Nz6BfZEk7APnffzrNRwgkQ=",
    link: "/dashboard/footwear",
  },
  {
    title: "Accessories",
    image: "https://images.unsplash.com/3/www.madebyvadim.com.jpg?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWNjZXNzb3JpZXN8ZW58MHx8MHx8fDA%3D",
    link: "/dashboard/accessories",
  },
];

export default function Categories() {
  const navigate = useNavigate();

  const handleNavigate = (link) => {
    navigate(link);
  };
  return (
    <div className="cat-container">
      {categories.map((category, index) => (
        <div
          key={index}
          className="cat-card"
          onClick={() => handleNavigate(category.link)}
        >
          <img src={category.image} alt={category.title} className="cat-img" />
          <div className="cat-title">{category.title}</div>
        </div>
      ))}
    </div>
  );
}
