import React from 'react';
import { Link } from 'react-router';

const Exipred = () => {
  return (
    <div>
      <h4>
        404 Page Not Found
      </h4>
      <Link to="/searchsurvey"> Survey Exipred! Go back to search page.</Link>
    </div>
  );
};

export default Exipred;