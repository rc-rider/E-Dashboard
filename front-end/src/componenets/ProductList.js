import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:8000/products",{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:8000/product/${id}`, {
      method: "Delete",
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if(key){
      let result = await fetch(`http://localhost:8000/search/${key}`,{
        headers:{
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      if(result){
        setProducts(result)
      }
    }else{
      getProducts();
    }
    
  };

  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input
        className="search-product-box"
        type="text"
        placeholder="Search Product"
        onChange={searchHandle}
      />
      <table>
      <thead>
      <tr>
        <th>Sr No.</th>
        <th>Name</th>
        <th>Price</th>
        <th>Category</th>
        <th>Company</th>
        <th>Operation</th>
      </tr>
      </thead>
      {
        products.length>0 ? products.map((item, index) => 
        <tbody>
        <tr key={item._id}>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td>${item.price}</td>
          <td>{item.category}</td>
          <td>{item.company}</td>
          <td>
            <button className="deletes" onClick={() => deleteProduct(item._id)}>Delete </button>
            &nbsp; /&nbsp;
            <Link className="links" to={"/update/" + item._id}> Update</Link>
          </td>
        </tr>
        </tbody>
        )
        :<h1> No Result Found </h1>
      }
      </table>
    </div>
  );
};

export default ProductList;
