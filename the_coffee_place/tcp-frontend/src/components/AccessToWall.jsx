import React from 'react';
import {Link} from 'react-router-dom';

export default function AccessToWall({className}) {
  return (
      <div className={className}>
          <div className="rounded-xl bg-white active:translate-y-1 transform transition
                focus:outline-none focus:ring focus:ring-offset-2 focus:ring-prim focus:ring-offset-prim-light
                focus:border-2 focus:border-red-500">
              <Link to='/wall'
                    title="The Coffee Place"
              >
                  <img
                      src="src/assets/icon.png"
                      alt="retour au fil de discussion"
                      width={50} height={50}
                  />

              </Link>

          </div>

      </div>
  )
};