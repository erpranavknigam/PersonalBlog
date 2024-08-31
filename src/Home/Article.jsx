import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import './Article.css'

const Article = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [desc, setDesc] = useState('')

    useEffect(() => {
        fetch('/articles.json')
            .then(response => response.json())
            .then(data => {
                const article = data.filter(x => x.id == id)
                setTitle(article[0].title)
                setDesc(article[0].body)
                setDate(article[0].date)
            })
            .catch(err => console.error("Article Fetching Failed."))
    })
    return (
        <>
            <div className="articleWrapper">
                <div className="articleHeader">
                    <div className="titleOfArticle">{title}</div>
                    <div className="dateOfArticle">Published On: {date}</div>
                </div>
                <div className="bodyOfArticle">
                    {desc}
                </div>
            </div>
        </>
    )
}

export default Article