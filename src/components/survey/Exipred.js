import React from 'react';
import { Link } from 'react-router';

const Exipred = () => {
  return (
    <div>
      <h4>
        Survey expired, please search for another survey
      </h4>
      <Link to="/searchsurvey"> Survey Exipred! Go back to search page.</Link>
    </div>
  );
};

export default Exipred;