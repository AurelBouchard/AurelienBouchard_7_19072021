import React from 'react';
import {Link} from 'react-router-dom';

export default function AccessToWall({className}) {
  return (
      <div className={className}>
          <Link to='/wall'
              title="The Coffee Place"
              className=""
          >
              <img
                  className="rounded-xl bg-yellow-400 active:translate-y-1 transform transition
                focus:outline-none focus:ring focus:ring-offset-2 focus:ring-coffee focus:ring-offset-foam"
                  src="src/assets/coffee-cup-192.png"
                  alt="retour au fil de discussion"
                  width={50} height={50}
              />

          </Link>

      </div>
  )
};