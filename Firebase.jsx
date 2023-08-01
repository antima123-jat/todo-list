import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth'
import {
    getFirestore,
    addDoc,
    collection,
    query,
    getDocs,
    where,
    doc,
    updateDoc
} from 'firebase/firestore'

import {
    getDatabase,
    set,
    ref,
    onValue,
    update,
    child,
    get
} from 'firebase/database'

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyBedH6hw052mEX178F0l5FEHYH2GApL7oM",
    authDomain: "todo-list-343c2.firebaseapp.com",
    projectId: "todo-list-343c2",
    storageBucket: "todo-list-343c2.appspot.com",
    messagingSenderId: "358902070049",
    appId: "1:358902070049:web:ec6b0b3ac10528c38a5c60",
    databaseURL: 'https://todo-list-343c2-default-rtdb.firebaseio.com/'
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp)

export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            user ? setUser(user) : setUser(null)
        })
    }, [])

    const signUpUserWithEmailAndPassword = (email, password) => {
        createUserWithEmailAndPassword(firebaseAuth, email, password)
    }

    const loginUserWithEmailAndPassword = (email, password) => {
        signInWithEmailAndPassword(firebaseAuth, email, password)
    }

    const logoutUser = () => {
        signOut(firebaseAuth)
    }

    const createTodo = async (title, description, date, priority) => {
        return await addDoc(collection(firestore, 'todo'), {
            title,
            description,
            date,
            priority,
            complete: false,
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
        })
    }

    const fetchTodos = async () => {
        const collectionRef = collection(firestore, 'todo');
        const q = query(collectionRef, where('userID', '==', user.uid))
        const result = await getDocs(q)
        return result;
    }

    const updateTodo = async (id, priority) => {
        const todoRef = doc(firestore, 'todo', id);
        await updateDoc(todoRef, {
            priority: priority
        })
    }

    // Realtime database

    const database = getDatabase(firebaseApp);

    const [todos, setTodos] = useState([])

    const putTodo = (key, data) => {
        set(ref(database, key), data)
    }

    const getTodos = () => {
        get(child(ref(database), 'todo'))
            .then(snap => console.log(snap.val()))
    }

    const patchTodo = (key, data) => {
        update(ref(database, key), data)
    }

    useEffect(() => {
        onValue(ref(database, 'todo'), (todo) =>{
            setTodos(...todos, todo.val())
        })
    }, [])

    return (
        <FirebaseContext.Provider value={{
            signUpUserWithEmailAndPassword,
            loginUserWithEmailAndPassword,
            logoutUser,
            createTodo,
            fetchTodos,
            updateTodo,
            user,

            putTodo,
            todos,
            patchTodo
        }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}