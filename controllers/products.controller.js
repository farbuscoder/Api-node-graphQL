import Product from "../models/products.js";

// AGREGAR NUEVO PRODUCTO

export const addProduct = async (req, res, next) => {
  const newProduct = new Product({ ...req.body });
  console.log(newProduct);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

// CONSEGUIR PRODUCTO POR ID

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// CONSEGUIR TODOS LOS PRODUCTOS

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.aggregate([{ $sample: { size: 20 } }]);
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
};

//MODIFICAR PRODUCTO
export const modifyProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.findByIdAndUpdate(
        req.params.id,

        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        message: "El producto fue modificado exitosamente",
      });
    } else {
      return res.status(404).json({ error: "El producto no fue hallado" });
    }
  } catch (error) {
    console.log(error);
  }
};

//ELIMINAR PRODUCTO
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "El producto fue eliminado exitosamente",
      });
    } else {
      return res.status(404).json({ error: "El producto no fue hallado" });
    }
  } catch (error) {
    console.log(error);
  }
};
