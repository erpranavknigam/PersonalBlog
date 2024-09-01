import React, { useEffect, useState } from 'react';
import './AdminHome.css'
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
    const [articles, setArticles] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        fetch('/articles.json')
            .then(response => response.json())
            .then(data => {
                setArticles(data)
            })
            .catch(err => {
                console.log("Error Fetching Articles")
            })
    }, [])

    const editArticle = (id) => {
        navigate(`/admin/Edit/${id}`)
    }

    const createArticle = () => {
        navigate('/admin/Add')
    }

    const deleteArticle = (id) => {
        fetch('/api/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'id': id})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert("Article Deleted Successfully");
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Failed to Delete article");
        });
    }

    return (
        <>
            <div className='articleCreationLinkWrapper'>
                <a onClick={createArticle} className='articleCreationLink'>Create Article</a>
            </div>
            <div>
                {
                    articles.map(article => (

                        <div key={article.id} className='article'>
                            <div className='articleHead'>
                                <h2 className='articleTitle'>{article.title}</h2>
                                <small className='articleDate'>Published On :{article.date}</small>
                            </div>
                            <div>
                                {article.body}
                            </div>
                            <a className='anchorArticle' onClick={() => editArticle(`${article.id}`)}><span className='readMoreLink'>Click to Edit</span> </a>  ||  
                            <a className='anchorArticle' onClick={() => deleteArticle(`${article.id}`)}><span className='readMoreLink'> Click to Delete</span></a>
                        </div>


                    ))
                }
            </div >
        </>
    )
};

export default AdminHome;
