import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

export default function InputTodos() {

    const firebase = useFirebase();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(Date.now());
    const [priority, setPriority] = useState('Low');

    const handleSubmit = async (e) => {
        e.preventDefault();

        await firebase.putTodo('todo/' + Date.now() + firebase.user.uid, { title, description, date, priority, id: Date.now() + firebase.user.uid })
        setDescription('');
        setPriority('Low');
        setTitle('')
    }

    useEffect(() => {
        !firebase.user && navigate('/login')
    }, [firebase])

    return (
        <div className='container'>
            <h1 className='mt-4 mb-5'>Input todo here</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Todo title</label>
                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} id="title" placeholder="Todo title" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Todo Description</label>
                    <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} id="desc" rows="3" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Due date</label>
                    <input type="date" className="form-control" value={date} onChange={e => setDate(e.target.value)} id="date" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="priority" className="form-label">Todo Priority</label>
                    <select className="form-select" id='priority' onChange={e => setPriority(e.target.value)} aria-label="Default select example">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
