import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, QuerySnapshot } from 'firebase/firestore';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersCollectionRef = collection(db, 'users');
    getDocs(usersCollectionRef).then((QuerySnapshot) => {
      QuerySnapshot.docs.forEach((doc) => console.log(doc.data));
    });
  }, []);

  return (
    <>
      <div>
        <h1>Hello世界</h1>
      </div>
    </>
  )
}

export default App;
