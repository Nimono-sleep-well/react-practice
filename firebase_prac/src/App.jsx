import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { addDoc, collection, doc, deleteDoc, DocumentSnapshot, getDoc, getDocs, onSnapshot, query, QuerySnapshot, serverTimestamp, setDoc, where, updateDoc, orderBy } from 'firebase/firestore';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {

    /*
    //コレクションを取得
    const usersCollectionRef = collection(db, 'users');
    getDocs(usersCollectionRef).then((QuerySnapshot) => {
      setUsers(
        QuerySnapshot.docs.map(
          (doc) => ({ ...doc.data(), id: doc.id})
        )
      )
    });
    */

    /*
    //IDを指定しドキュメントを取得
    const usersDocumentRef = doc(db, 'users', '9bNmbAPBJ2ENjM3rc33z');
    getDoc(usersDocumentRef).then((DocumentSnapshot) => {
      if(DocumentSnapshot.exists()){
        console.log(DocumentSnapshot.data());
      } else {
        console.log('[Err]No such document');
      }
    })
    */

    //リアルタイムコレクション取得
    const usersCollectionRef = collection(db, 'users');
    const q = query(usersCollectionRef, orderBy('name'));
    const unsub = onSnapshot(q, (QuerySnapshot) => {
      setUsers(
        QuerySnapshot.docs.map(
          (doc) => ({ ...doc.data(), id: doc.id})
        )
      )
    });
    return unsub;

    /*
    //リアルタイムドキュメント取得
    const usersDocumentRef = doc(db, 'users', '9bNmbAPBJ2ENjM3rc33z');
    const unsub = onSnapshot(usersDocumentRef, (DocumentSnapshot) => {
      console.log(DocumentSnapshot.data());
    });
    return unsub;
    */

  }, []);

  /*
  //buttonでデータ取得
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email } = event.target.elements;
    console.log(name.value, email.value);
  }
  */

  
  //addDocによるドキュメント追加
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email } = event.target.elements;
    console.log(name.value, email.value);
    const usersCollectionRef = collection(db, 'users');
    const documentRef = await addDoc(usersCollectionRef, {
      name: name.value,
      email: email.value,
    });
    console.log(documentRef);
  };

  
  /*
  //setDocによるドキュメント追加
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const { name, email } = event.target.elements;
    
    const usersDocumentRef = doc(db, 'users', 'ABCDEF');
    const documentRef = await setDoc(usersDocumentRef, {
      name: name.value,
      email: email.value,
      admin: true,
      timestamp: serverTimestamp(),//追加した時刻のタイムスタンプ
    });
    console.log(usersDocumentRef.id);//追加されたドキュメントのID
  };
  */

  /*
  //userの削除(deleteButtonの引数をuser.idに変更)
  const deleteUser = async (id) => {
    const usersDocumentRef = doc(db, 'users', id);
    await deleteDoc(usersDocumentRef);
  }
  */

  //where句を用いた削除(deleteButtonの引数をuser.nameに変更)
  const deleteUser = async (name) => {
    const usersCollectionRef = collection(db, 'users');
    const q = query(usersCollectionRef, where('name', '==', name));
    const QuerySnapshot = await getDocs(q);
    QuerySnapshot.forEach(async (document) => {
      const usersDocumentRef = doc(db, 'users', document.id);
      await deleteDoc(usersDocumentRef);
    });
  };

  const changeAdmin = async (id) => {
    const usersDocumentRef = doc(db, 'users', id);
    await updateDoc(usersDocumentRef, {
      admin: true,
    });
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>name</label>
            <input name="name" type="text" placeholder='名前' />
          </div>
          <div>
            <label>mail</label>
            <input name="email" type="text" placeholder='メアド' />
          </div>
          <div>
            <button>Resister</button>
          </div>
        </form>

        <h1>UserList</h1>
        <div>
          {users.map((user) => (
            <div key={user.id}>
              <span>{user.name}</span>
              <button onClick={() => deleteUser(user.name)}>Delete</button>
              {!user.admin && (
                <button onClick={() => changeAdmin(user.id)}>admin</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App;
