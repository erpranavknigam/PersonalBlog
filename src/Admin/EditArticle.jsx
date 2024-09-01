import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EditArticle.css'
import 'bootstrap/dist/css/bootstrap.css'

const EditArticle = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetch('/articles.json')
            .then(response => response.json())
            .then(data => {
                const filtered = Array.from(data).filter(x => x.id === Number(id));
                setTitle(filtered[0].title);
                setContent(filtered[0].body);
                setDescription(filtered[0].fullContent)
            });
    }, [id]);


    const changeArticleTitle = (event) => {
        setTitle(event.target.value);
    };

    const changeShortDescription = (event) => {
        setContent(event.target.value);
    };

    const changeDescription = (event) => {
        setDescription(event.target.value);
    };

    const submitForm = (event) => {
        event.preventDefault(); 
    
        if (title.trim() !== "" && content.trim() !== "" && description.trim() !== "") {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            const fullDate = `${day}-${month + 1}-${year}`;
    
            const articleData = { id: Number(id), title: title, body: content, fullContent: description, date: fullDate }; // Include the id here
            fetch('/api/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(articleData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                alert("Article Updated Successfully", data);
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Failed to update article");
            });
            
        } else {
            alert("Please enter data in all fields");
        }
    };
    

    return (
        <div id='root'>
            <div className='editTitleWrapper'>
                <p className='editTitle'>Edit Article - {title}</p>
            </div>

            <form onSubmit={submitForm}>
                <div className='editForm'>
                    <div className='mb-3 ms-2 me-2 mt-3'>
                        <label className='form-label fw-bold'>Title of Article:</label>
                        <input className='form-control' type='text' value={title} onChange={changeArticleTitle} maxLength={100} />
                    </div>
                    <div className='mb-3 ms-2 me-2 mt-3'>
                        <label className='form-label fw-bold'>Short Description of Article:</label>
                        <textarea className='form-control' value={content} onChange={changeShortDescription} rows={5} maxLength={500}></textarea>
                    </div>
                    <div className='mb-3 ms-2 me-2 mt-3'>
                        <label className='form-label fw-bold'>Description of Article:</label>
                        <textarea className='form-control' value={description} onChange={changeDescription} rows={15}></textarea>
                    </div>
                    <div className='mb-3 ms-2 me-2 mt-3'>
                        <input type='submit' className='btn btn-success' value="Update" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditArticle;
