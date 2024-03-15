import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import Message from "../components/Message";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

const Chat = ({ room, setRoom }) => {
  //
  const [messages, setMessages] = useState([]);

  // ccollectionun referansını alma
  const messagesCol = collection(db, "messages");

  //mesaj gönderme
  const handleSubmit = (e) => {
    e.preventDefault();

    // belirttiğimiz koleksiyona eleman ekler
    addDoc(messagesCol, {
      text: e.target[0].value,
      user: auth.currentUser.displayName,
      room,
      createdAt: serverTimestamp(),
    });

    // inputu sıfırlama
    e.target[0].value = "";
  };

  // gönderdiğimiz mesajları alma
  useEffect(() => {
    //* filtreleme ayarlarını yapma
    const queryOptions = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    //* kolleksiyonun değişimini izler
    //* değişimi algıladığında fonksiyonu çalıştırır
    onSnapshot(queryOptions, (snapshot) => {
      //
      let comingMessages = [];

      //* kolleksiyonu dönüp document'ın verilerine erişme
      snapshot.forEach((doc) => {
        comingMessages.push(doc.data());
      });

      setMessages(comingMessages);
    });
  }, []);
  console.log(messages);
  return (
    <div className="chat">
      <header>
        <p className="user">{auth.currentUser.displayName}</p>
        <p>{room}</p>
        <a onClick={() => setRoom(null)}>Farklı Oda</a>
      </header>
      <main>
        {messages.map((msg) => (
          <Message msg={msg} user={auth.currentUser.displayName} />
        ))}
      </main>
      <form onSubmit={handleSubmit}>
        <input placeholder="mesajınızı yazınız..." type="text" />
        <button>Gönder</button>
      </form>
    </div>
  );
};

export default Chat;
