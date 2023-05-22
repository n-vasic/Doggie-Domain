import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { Col, Container, Row } from 'react-bootstrap';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  //HANDLE FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/dd/category/create-category', {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  //GET ALL CATEGORIES
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('/api/dd/category/get-category');
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong while getting categories');
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  //UPDATE CATEGORY
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/dd/category/update-category/${selected._id}`,
        { name: updatedName }
      );

      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName('');
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  //DELETE CATEGORY
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/dd/category/delete-category/${pId}`,
        { name: updatedName }
      );

      if (data.success) {
        toast.success('Categorydeleted');
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  return (
    <Layout>
      <Container fluid className="m-3 p-3">
        <Row>
          <Col md={3}>
            <AdminMenu></AdminMenu>
          </Col>
          <Col md={9} className='createCatRight'>
            <h1>Manage categories</h1>
            <div>
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td className="button-container">
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-2 "
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default CreateCategory;
