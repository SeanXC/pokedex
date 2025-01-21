import React, { useEffect, useState } from 'react';
import loadingIcon from '../assets/loading.svg';

const MyAccount: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loading">
          <img src={loadingIcon} alt="Loading" className="loading-icon" />
        </div>
      ) : (
        <h1></h1>
      )}
    </div>
  );
};

export default MyAccount;
