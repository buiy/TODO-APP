import React, { useEffect, useState } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input,setInput]= useState('');

  // When the app loads , we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() =>{
    //this coad here... fires when the app.js loads
   db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
     setTodos(snapshot.docs.map(doc => ({id: doc.id ,todo: doc.data().todo})))
   })
  }, []);
  
  const addTodo = (event) => {
    // This will fireoff when we click the button
    event.preventDefault(); //will Stop the refresh


    db.collection('todos').add({
      todo : input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })


    setInput(''); // clearup the input after hitting the button

  }

  return (
    <div className="App">
     <h1>Hello Clever Programmers 🚀! </h1>
     
     <form>

     <FormControl>
       <InputLabel>✅ Write a Todo</InputLabel>
       <Input value={input} onChange = {event =>setInput(event.target.value)}/>
     </FormControl>
     <Button disabled={!input} type='submit' onClick={addTodo} variant="contained" color="primary">
      Add Todo
      </Button>
     </form>

     <ul>
       {todos.map( todo => (
         <Todo todo={todo}/>
        //<li>{todo}</li>
       ))}
     </ul>
     
    </div>
  );
}

export default App;
