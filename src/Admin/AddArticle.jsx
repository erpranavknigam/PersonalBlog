import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AddArticle.css'
import 'bootstrap/dist/css/bootstrap.css'

const AddArticle = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');

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
    
            const articleData = { title: title, body: content, fullContent: description, date: fullDate }; // Include the id here
            fetch('/api/add', {
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
                alert("Article Added Successfully", data);
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Failed to Add article");
            });
            
        } else {
            alert("Please enter data in all fields");
        }
    };
    

    return (
        <div id='root'>
            <div className='editTitleWrapper'>
                <p className='editTitle'>Add Article - {title}</p>
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
                        <input type='submit' className='btn btn-success' value="Add" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddArticle;
