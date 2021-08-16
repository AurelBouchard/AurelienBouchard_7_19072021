import React from 'react';
import {Link} from 'react-router-dom';

export default function AccessToFlow({className}) {
  return (
      <div className={className}>
          <Link to='/'
              title="The Coffee Place"
              className=""
          >
              <img
                  className="rounded-xl bg-yellow-400"
                  src="src/assets/coffee-cup-192.png"
                  alt="retours au fil de discussion"
                  width={50} height={50}
              />

          </Link>

      </div>
  )
};