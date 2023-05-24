import React from 'react';
import { useSearch } from '../../context/search';

import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const SearchInput = () => {
  const [values, setvalues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/dd/product/search/${values.keyword}`
      );
      setvalues({ ...values, results: data });
      navigate('/search');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Form className="d-flex" onSubmit={handleSubmit}>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setvalues({ ...values, keyword: e.target.value })}
        />
        <Button variant="outline-success" type="submit">
          Search
        </Button>
      </Form>
    </div>
  );
};

export default SearchInput;
