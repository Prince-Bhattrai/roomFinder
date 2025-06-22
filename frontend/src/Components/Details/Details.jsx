// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { url } from '../../../url';
// import "./Details.css"

// const Details = () => {
//   const [data, setData] = useState({});
//   const { id } = useParams();
// //   const[user,setUser] = useEffect({})

//   useEffect(() => {
//     axios
//       .get(`${url}/user/post/getone/${id}`)
//       .then((res) => setData(res.data.data))
//       .catch((err) => console.log(err));
//   }, [id]);
// //   useEffect(()=>{
// //     axios.get(`${url}/user/one/${data.user}`)
// //     .then(res=>console.log(res.data))
// //   },[])

//   return (
//     <div className="details">
//       <div className="right">
//         {/* ✅ Updated video tag with controls */}
//         <video
//           src={`${url}/uploads/${data.video}`}
//           controls
//           autoPlay
//           muted
//           loop
//           style={{ width: '100%', maxWidth: '500px', borderRadius: '12px' }}
//         />
//       </div>

//       <div className="left">
//         <h2>{data.title}</h2>
//         <p><strong>City:</strong> {data.city}</p>
//         <p><strong>Area:</strong> {data.area}</p>
//         <p><strong>Room Type:</strong> {data.roomtype}</p>
//         <p><strong>Contact:</strong> {data.contact}</p>
//         <p><strong>Description:</strong> {data.description}</p>
//         <p><strong>Rent:</strong>RS.<span style={{color:"tomato"}}>{data.rent}</span></p>
//         <p><strong>Uploaded Date:</strong> {new Date(data.updatedAt).toLocaleString()}</p>
//         <button onClick={()=>console.log(data)}> Click</button>

//       </div>
      
//     </div>
//   );
// };

// export default Details;



import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { url } from '../../../url';
import "./Details.css";

const Details = () => {
  const [data, setData] = useState({});
  const [user, setUser] = useState({});
  const { id } = useParams();

  // Fetch post data
  useEffect(() => {
    axios.get(`${url}/user/post/getone/${id}`)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, [id]);

  // Fetch user data only when `data.user` is available
  useEffect(() => {
    if (data.user) {
      axios.get(`${url}/user/one/${data.user}`)
        .then(res => setUser(res.data.data))
        .catch(err => console.log(err));
    }
  }, [data.user]);

  return (
    <div className="details">
      <div className="right">
        <video
          src={`${url}/uploads/${data.video}`}
          controls
          autoPlay
          loop
          style={{ width: '100%', maxWidth: '500px', borderRadius: '12px' }}
        />
      </div>

      <div className="left">
        <h2>{data.title}</h2>
        <p><strong>City:</strong> {data.city}</p>
        <p><strong>Area:</strong> {data.area}</p>
        <p><strong>Room Type:</strong> {data.roomtype}</p>
        <p><strong>Contact:</strong> {data.contact}</p>
        <p><strong>Description:</strong> {data.description}</p>
        <p><strong>Rent:</strong> RS. <span style={{ color: "tomato" }}>{data.rent}</span></p>
        <p><strong>Uploaded Date:</strong> {new Date(data.updatedAt).toLocaleString()}</p>

        {/* Show uploader info */}
        <h3>Posted By:</h3>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default Details;
