import productModel from '../models/productModel.js';
import categoryModel from '../models/categoryModel.js';
import fs from 'fs';
import slugify from 'slugify';
import orderModel from '../models/orderModel.js';
import braintree from 'braintree';
import dotenv from 'dotenv';

dotenv.config();
//PAYMENT GATEWAY
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

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
      res.set('Content-type', product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'error while getting photo',
      error,
    });
  }
};

//DELETE PRODUCT
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

//SEARCH PRODUCTS

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
        ],
      })
      .select('-photo');
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: 'Error In Search Product API',
      error,
    });
  }
};

//
// similar products
export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select('-photo')
      .limit(3)
      .populate('category');
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: 'error while geting related product',
      error,
    });
  }
};

// GET PRODUCTS BY CATEGORY
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate('category');
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: 'Error While Getting products',
    });
  }
};

//PAYMENT
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
