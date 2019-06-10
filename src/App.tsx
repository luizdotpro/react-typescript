import React from 'react';
import { Store } from './Store';
import './index.css'
import { IAction, IEpisode } from './interfaces'


const App: React.FunctionComponent = (): JSX.Element => {

  const { state, dispatch } = React.useContext(Store)

  React.useEffect(() => {
    state.episodes.length === 0 && fetchDataAction()
    console.log('useEffect hook')
  })

  const fetchDataAction = async () => {
    const data = await fetch('https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes')
    const dataJSON = await data.json()
    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    })
  }

  const toggleFavAction = ( episode: IEpisode ): IAction => dispatch({
    type: 'ADD_FAV',
    payload: episode
  })

  console.log('state -', state)

  return (
    <>
      <header className="header">
        <h2>Rick and Morty Episode picker.</h2>
        <p> Pick your favourite episode!</p>
      </header>
      <section className="episodeLayout">
        {state.episodes.map((episode: IEpisode) => {
          if (episode.image) {
            return (
              <section key={episode.id} className="episodeBox">
                <img src={episode.image.medium} alt={`Rick and Morty ${episode.name}`} />
                <div>{episode.name}</div>
                <section>Season: {episode.season} Number: {episode.number} </section>
                <button type="button" onClick={() => toggleFavAction(episode)}>Fav</button>
              </section>
            )
          }
          else {
            return null
          }
        })}
      </section>
    </>
  );
}

export default React.memo(App);
