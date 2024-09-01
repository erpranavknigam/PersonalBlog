import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import './Article.css'
import DOMPurify from 'dompurify';


const Article = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [desc, setDesc] = useState('')
    const [body, setBody] = useState('')

    useEffect(() => {
        fetch('/articles.json')
            .then(response => response.json())
            .then(data => {
                const article = data.filter(x => x.id == id)
                setTitle(article[0].title)
                setDesc(article[0].body)
                setDate(article[0].date)
                setBody(article[0].fullContent)
            })
            .catch(err => console.error("Article Fetching Failed."))
    })
    const cleanHtml = DOMPurify.sanitize(body);
    return (
        
        <>
            <div className="articleWrapper">
                <div className="articleHeader">
                    <div className="titleOfArticle">{title}</div>
                    <div className="dateOfArticle">Published On: {date}</div>
                </div>
                <div className="bodyOfArticle"
                dangerouslySetInnerHTML={{ __html: cleanHtml }}>
                </div>
            </div>
        </>
    )
}

export default Article