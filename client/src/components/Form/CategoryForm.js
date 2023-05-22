import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <div className="p-3">
      <Form style={{width:"60vw"}} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Control
            type="text"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create 
        </Button>
      </Form>
    </div>
  );
};

export default CategoryForm;
