import { useState } from 'react';
import './App.css';
import GitHubImage from './github-logo.png';

function App() {
  const [search, setSearch] = useState('');
  const [userData, setUserData] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://api.github.com/users/${search}`)
         .then(response => response.json())
         .then(userResponse => setUserData(userResponse));
  }


  console.log(userData)

  const handleChange = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value)
  }

  return (
    <div className="container text-center">
        <h1 className="py-5 text-uppercase">Github profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Github user</label>
            <div className="input-group">
              <input
               type="text"
               className="form-control"
               required
               value={search}
               onChange={handleChange}
              />
              <span className="input-group-btn">
                <button type="submit" className="btn btn-success">
                  Search
                </button>
              </span>
            </div>
          </div>
        </form>
        <div className="py-5">
          {!userData && (
            <img 
            src={GitHubImage} 
            className="responsive rounded-circle"
            alt="" 
            height="200px"
          />
          )}
          {userData && (
           <div>
           <img 
            src={userData.avatar_url} 
            className="responsive rounded-circle"
            alt="" 
            height="200px"
            />
            <h1 className="pt-5">
            <a href={'https://github.com/' + userData.login} target="_blank">
              {userData.name}
              </a>
            </h1>
            <h1>{userData.location}</h1>
            <p>
              <a href={'https://github.com/' + userData.blog} target="_blank" className="text-info"> 
              {userData.blog}
              </a>
            </p>
           </div>
          )}
        </div>
    </div>
  );
}

export default App;
