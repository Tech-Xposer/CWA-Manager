import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Blog() {
    const [blogs, setBlogs] = useState([]);

    async function getBlogs() {
        try {
            const response = await axios.get('http://localhost:3008/getblogs');
            setBlogs(response.data); // Update state with the fetched data
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    }

    // Call getBlogs when the component mounts
    useEffect(() => {
        getBlogs();
    }, []);

    return (
        <div>
            {blogs.map((blog) => (
                <div className="row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <div className="card my-5" style={{ width: '18rem' }}>
                           <p>{blog.title}</p>
                            <img src={"http://localhost:3008/blogUploads/" + blog.image} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{blog.title}</h5>
                                <p className="card-text">{blog.metadescription}</p>
                                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            
        </div>
    );
}
