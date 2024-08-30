import { useEffect, useState } from 'react';
import './Home.css'
import {useNavigate} from 'react-router-dom'


function Home() {
    const navigate = useNavigate()
    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetch('/articles.json')
            .then(response => response.json())
            .then(data => {
                setArticles(data)
                console.log(data)
            })
            .catch(err => console.error("Error Fetching Articles"))
    }, [])

    const openArticlePage = (articleId) => {
        navigate(`article/${articleId}`)
    }

    return (
        <>
            <div className='blogTitle'>
                <div className='blogHeader'>Personal Blog</div>
                <div className='login'>Login</div>
            </div>
            <div className='underLines'></div>
            <div>
                {
                    articles.map(article => (
                        <a key={article.id} className='anchorArticle' onClick={() => openArticlePage(`${article.id}`)}>
                            <div key={article.id} className='article'>
                                <div className='articleHead'>
                                    <h2 className='articleTitle'>{article.title}</h2>
                                    <small className='articleDate'>Published On :{article.date}</small>
                                </div>
                                <p>{article.body}</p>
                            </div>
                        </a>

                    ))
                }
            </div>
        </>
    );
}

export default Home;
