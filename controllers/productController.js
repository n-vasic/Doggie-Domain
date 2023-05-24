import productModel from '../models/productModel.js';
import fs from 'fs';
import slugify from 'slugify';

//CREATE PRODUCT
export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //VALIDATIOn//
    switch (true) {
      case !name:
        return res.status(500).send({ error: 'Name is required!' });
      case !description:
        return res.status(500).send({ error: 'Description is required!' });
      case !price:
        return res.status(500).send({ error: 'Price is required!' });
      case !category:
        return res.status(500).send({ error: 'Category is required!' });
      case !quantity:
        return res.status(500).send({ error: 'Quantity is required!' });
      case photo && photo.size > 2000000:
        return res
          .status(500)
          .send({ error: 'Photo is required and should be less than 2mb!' });
    }
    const products = new productModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: 'Product Created Successfully',
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error while creating product',
    });
  }
};

//GET ALL PRODUCTS
export const getProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate('category')
      .select('-photo')
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: 'Got all products successfully',
      products,
    });
  } catch (error) {
    console.log(error);
    res.stauts(500).send({
      success: false,
      message: 'Error while getting products',
      error: error.message,
    });
  }
};

//GET SINGLE PRODCUT

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select('-photo')
      .populate('category');
    res.status(200).send({
      success: true,
      message: 'Succesfully got single product',
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while getting single product',
      error,
    });
  }
};

//GET PRODUCT PHOTO

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select('photo');
    if (product.photo.data) {
      res.set('Content-Type', product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while getting product picture',
      error,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select('-photo');
    res.status(200).send({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while deleting product',
      error,
    });
  }
};

//UPDATE PRODUCT
export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //VALIDATIOn//
    switch (true) {
      case !name:
        return res.status(500).send({ error: 'Name is required!' });
      case !description:
        return res.status(500).send({ error: 'Description is required!' });
      case !price:
        return res.status(500).send({ error: 'Price is required!' });
      case !category:
        return res.status(500).send({ error: 'Category is required!' });
      case !quantity:
        return res.status(500).send({ error: 'Quantity is required!' });
      case photo && photo.size > 2000000:
        return res
          .status(500)
          .send({ error: 'Photo is required and should be less than 2mb!' });
    }
    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: 'Product Updated Successfully',
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error while updating product',
    });
  }
};

//FILTERS

export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: 'Error While Filtering Products',
      error,
    });
  }
};

//PRODUCT COUNT

export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: 'Error in product count',
      error,
    });
  }
};

//PRODUCT LIST PER PAGE
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select('-photo')
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: 'Error while retrieving product list',
      error,
    });
  }
};
