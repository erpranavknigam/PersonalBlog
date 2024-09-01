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
                            <a key={article.id} className='anchorArticle' onClick={() => editArticle(`${article.id}`)}><p>{article.body} <span className='readMoreLink'>Click to Edit</span></p> </a>
                        </div>


                    ))
                }
            </div >
        </>
    )
};

export default AdminHome;
