import React from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAddProductMutation } from "../features/api/productApi";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const [addProduct, { isLoading, isError, error }] = useAddProductMutation();
  const navigate = useNavigate();

  const addProductHandle = async (product) => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("description", product.description);
    formData.append("thumbnail", product.thumbnail[0]);

    for (let image of product.images) {
      formData.append("images", image);
    }

    const response = await addProduct(formData);
    console.log(response);

    if (response.data?.statusCode === 201) {
      reset();
      navigate("/");
    }
  };

  return (
    <>
      {!isLoading ? (
        <form
          onSubmit={handleSubmit(addProductHandle)}
          className="mx-auto w-6/12 "
        >
          <Input
            label="Product Name"
            type="text"
            placeholder="Enter product name"
            {...register("name")}
          />
          <Input
            label="Price"
            type="number"
            placeholder="Enter product price"
            {...register("price")}
          />

          <Input
            label="Category"
            type="text"
            placeholder="Category..."
            {...register("category")}
          />
          <Input
            label="Description"
            type="text"
            placeholder="Description"
            {...register("description")}
          />
          <Input
            label="Thumbnail"
            type="file"
            accept="image/*"
            {...register("thumbnail")}
          />
          <Input
            label="Images"
            type="file"
            multiple
            accept="image/*"
            {...register("images")}
          />
          <Button type="submit" className="min-w-24">
            Add
          </Button>
        </form>
      ) : (
        <Loader text="Addind Product, please wait..." />
      )}
    </>
  );
};

export default AddProduct;
