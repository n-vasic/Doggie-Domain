import React from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';
function ShopPage() {
  const [auth] = useAuth();

  return (
    <Layout>
      <div>ShopPage</div> <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
}

export default ShopPage;
