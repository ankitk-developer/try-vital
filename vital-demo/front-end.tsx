import React, { useState } from 'react'

const Main = () => {
  const [name, setName] = useState("");

  const handleFitConnectFunction = async () => {
    const response = await fetch('http://localhost:5000/', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        name: name,
      })
    })
    if (response) {
      const resResponse = await response.json()
      window.location.href = resResponse?.link
    }
  }
  return (
    <div className='' style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className='' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {/* <button style={{background:"darkgrey", padding:"8px "}}>
          Sync my wearable data
        </button> */}
        <div className='connect_container'>
          <input type="text" className="interactive-input" placeholder="Name" onChange={(e) => setName(e.target.value)}></input>
          <div>
            <button className='custom-button' onClick={handleFitConnectFunction}>
              Sync my wearable data
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Main
