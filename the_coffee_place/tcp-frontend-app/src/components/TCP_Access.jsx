import React from 'react';

export default function TCP_Access() {
  return (
      <div className="fixed bottom-10 right-8 md:right-32 lg:right-60">
          {/*MAIS POURQUOI right-4 BLOQUE LE RESPONSIVE !?!?!? */}
          <a
              onClick={() =>{alert("lets go !")} }
              href="#"
              title="The Coffee Place"
              className="">
              <img
                  className="rounded-xl bg-yellow-400"
                  src="src/assets/coffee-cup-192.png"
                  alt="retours au fil de discussion"
                  width={50} height={50}
              />

          </a>

      </div>
  )
};