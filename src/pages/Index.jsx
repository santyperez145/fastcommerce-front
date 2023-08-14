import Card from "../components/Card";
import Carousel from "../components/Carousel"
import ProductByCategory from "./products/ProductByCategory"
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as Anchor } from "react-router-dom";
import { useDispatch } from 'react-redux';
import productsActions from '../redux/actions/products'

export default function Index() {
  const dispatch = useDispatch();

  const getProducts = async () => {
    dispatch(productsActions.data_products());
  }

  useEffect(() => {
    getProducts();
    dispatch(productsActions.data_products());
  }, []);

  const images = [
    'https://i.postimg.cc/Hx3mhKTj/1.png',
    'https://i.postimg.cc/28gDMnNd/2.png',
    'https://i.postimg.cc/K8L224m6/3.png',
    'https://i.postimg.cc/Xvb073Jp/4.png',
  ];

  function filterByCategoryId(products, categoryId) {
    const filteredProducts = [];
    for (const product of products) {
      if (product?.category_id === categoryId) {
        filteredProducts.push(product);
      }
    }
    return filteredProducts;
  }

  const products = useSelector((store) => store.products.products);
  console.log(products)
  //let carpentryProducts = products?.find(products?.category_id == '64d4fd9fc84ae7805abbeab6' )

  


  let carpentryProducts = filterByCategoryId(products, "64d4fd9fc84ae7805abbeab6")
  console.log(carpentryProducts)

  let constructionProducts = filterByCategoryId(products, "64d4fd9fc84ae7805abbeab7")
  console.log(constructionProducts)

  let electricityProducts = filterByCategoryId(products, "64d4fd9fc84ae7805abbeab8")
  console.log(electricityProducts)

  let flooringProducts = filterByCategoryId(products, "64d4fd9fc84ae7805abbeab9")
  console.log(flooringProducts)

  let furnitureProducts = filterByCategoryId(products, "64d4fd9fc84ae7805abbeaba")
  console.log(furnitureProducts)

  let hardwareProducts = filterByCategoryId(products, "64d4fd9fc84ae7805abbeabb")
  console.log(hardwareProducts)

  let homeDecorationProducts = filterByCategoryId(products, "64d4fd9fc84ae7805abbeabc")
  console.log(homeDecorationProducts)

  let kitchenProducts = filterByCategoryId(products, "64d4fd9fc84ae7805abbeabd")
  console.log(kitchenProducts)

  let paintingProducts = filterByCategoryId(products, "64d4fd9fc84ae7805abbeabe")
  console.log(paintingProducts)

  let toolsProducts = filterByCategoryId(products, "64d4fd9fc84ae7805abbeabf")
  console.log(toolsProducts)

  return (
    <div>
      <Carousel images={images}/>
      {/*<Card className="self-center "/>*/}
      <p className="text-black ps-[5vw] mt-[3vh] pt-9 text-2xl font-mono font-semibold">Carpentry Products:</p>
      <ProductByCategory productsList={carpentryProducts}/>

      <p className="text-black ps-[5vw] mt-[3vh] pt-9 text-2xl font-mono font-semibold">Construction Products:</p>
      <ProductByCategory productsList={constructionProducts}/>

      <p className="text-black ps-[5vw] mt-[3vh] pt-9 text-2xl font-mono font-semibold">Electrical Products:</p>
      <ProductByCategory productsList={electricityProducts}/>

      <p className="text-black ps-[5vw] mt-[3vh] pt-9 text-2xl font-mono font-semibold">Flooring Products:</p>
      <ProductByCategory productsList={flooringProducts}/>

      <p className="text-black ps-[5vw] mt-[3vh] pt-9 text-2xl font-mono font-semibold">Hardware Products:</p>
      <ProductByCategory productsList={hardwareProducts}/>

      {/*<p className="text-black ps-[5vw] mt-[3vh] pt-9 text-2xl font-mono font-semibold">Home Decoration Products:</p>
      <ProductByCategory productsList={homeDecorationProducts}/>*/}

      <p className="text-black ps-[5vw] mt-[3vh] pt-9 text-2xl font-mono font-semibold">Kitchen & Bathrrom Products:</p>
      <ProductByCategory productsList={kitchenProducts}/>

      <p className="text-black ps-[5vw] mt-[3vh] pt-9 text-2xl font-mono font-semibold">Painting Products:</p>
      <ProductByCategory productsList={paintingProducts}/>

      <p className="text-black ps-[5vw] mt-[3vh] pt-9 text-2xl font-mono font-semibold">Tools:</p>
      <ProductByCategory productsList={toolsProducts}/>
      
    </div>
  )
}