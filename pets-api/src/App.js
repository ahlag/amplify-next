import Amplify, {API} from 'aws-amplify';
import config from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import './App.css';
import React, { useEffect } from 'react';

Amplify.configure(config);

function App() {
  const [petName, setPetName] = React.useState('');
  const [petType, setPetType] = React.useState('');
  const [pets, setPets] = React.useState('');

  useEffect(() => {
    API.get('petsapi', '/pets/name').then((petRes) => {
      setPets([...pets, ...petRes]);
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    API.post('petsapi', '/pets', {
      body: {
        name: petName,
        type: petType,
      }
    }).then(() => {
      setPets([...pets])
    });
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="App">
          <p>
            Hey {user.username}, welcome to my channel, with auth!
          </p>
          <form onSubmit={handleSubmit}>
            <input value={petName} placeholder="fiddo" onChange={(e) => setPetName(e.target.value)}></input>
            <input value={petType} placeholder="fiddo" onChange={(e) => setPetType(e.target.value)}></input>
            <button>Add Pet</button>
          </form>
          <ul>
            {pets.map(pet => <li>{pet.name}</li>)}
          </ul>
          <button onClick={signOut}>Sign out</button>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
