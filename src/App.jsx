import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import Chat from "./pages/Chat";
import Auth from "./pages/Auth";

function App() {
  //
  const [isAuth, setIsAuth] = useState(true);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);

  // çıkış yapma fonk
  const handleLogout = () => {
    // kullanınıcının oturumunu kapatar
    signOut(auth).catch((err) => console.log("HATA", err));
  };

  // form gödnderilidğinde çalışır
  const handleSubmit = (e) => {
    e.preventDefault();
    // kullanıcını giriş yapıcağı odayı belirleme
    setRoom(e.target[0].value);
  };

  /* kullanıcı yoksa giriş ekranını  gösterir */
  if (!isAuth) {
    return (
      <div className="container">
        <Auth />
      </div>
    );
  }

  return (
    <div className="container">
      {room ? (
        <Chat room={room} setRoom={setRoom} />
      ) : (
        <form onSubmit={handleSubmit} className="room-container">
          <h1>Chat Odası</h1>
          <p>Hangi Odaya Giriceksiniz</p>
          <input type="text" />

          <button type="submit">Odaya Gir</button>

          <button
            onClick={handleLogout}
            className="logout"
            type="button"
          >
            Çıkış Yap
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
