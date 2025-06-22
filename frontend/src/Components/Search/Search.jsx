import React, { useState } from 'react';
import { GoSearch } from "react-icons/go";
import "./Search.css";
import axios from "axios";
import { url } from '../../../url'; // or your backend base URL
import { Link } from 'react-router-dom';

const Search = () => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    const searchHandler = async () => {
        if (!search) return;

        try {
            const res = await axios.get(`${url}/user/post/search?title=${search}`);
            if (res.data.success) {
                setResults(res.data.data);
            } else {
                setResults([]); // No match found
            }
        } catch (err) {
            console.log("Search error:", err);
        }

        setSearch(""); // clear search box
    };

    return (
        <div className='search'>
            <div className="serch-text">
                <input
                    type="text"
                    placeholder='Search here...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                   
                />
                 <GoSearch className="search-icon" onClick={searchHandler} />
            </div>

            {results.length === 0 ? <p className='no-result'>No results found.</p> : <p style={{ marginBottom: "10px" }}>Reasult...{search}</p>}
            <div className="match-item">

                {results.map((item, index) => (
                    <div key={index} className="card">

                       <Link to={`/details/${item._id}`} style={{textDecoration:"none",color:"#444"}}><video
                            src={`${url}/uploads/${item.video}`}

                        ></video>
                        <hr />
                        <h3>{item.title}</h3>
                        <p>Area: {item.area}</p>
                        <p>RS:</p></Link>


                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;

