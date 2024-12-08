import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, QuerySnapshot } from 'firebase/firestore';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersCollectionRef = collection(db, 'users');
    getDocs(usersCollectionRef).then((QuerySnapshot) => {
      console.log(QuerySnapshot);
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
