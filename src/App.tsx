import React from 'react';
import {Store} from './Store';

function App():JSX.Element {

  const { state, dispatch } = React.useContext(Store)

  React.useEffect(() => {
    state.episodes.length === 0 && fetchDataAction()
  })

  const fetchDataAction = async () => {
    const data = await fetch('https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes')
    const dataJSON = await data.json()
    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    })
  }

  console.log('state -', state)

  return (
    <>
    <h1> Rick and Morty </h1>
    <p> Pick your favourite episode!</p>
    </>
  );
}

export default App;
