import React from 'react'
import { Store } from './Store'
import './index.css'
import { IAction, IEpisode } from './interfaces'

const EpisodesList = React.lazy<any>(() => import('./EpisodesList'))

const App: React.FunctionComponent = (): JSX.Element => {
    const { state, dispatch } = React.useContext(Store)

    React.useEffect(() => {
        state.episodes.length === 0 && fetchDataAction()
        console.log('useEffect hook')
    })

    const fetchDataAction = async () => {
        const data = await fetch(
            'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes'
        )
        const dataJSON = await data.json()
        return dispatch({
            type: 'FETCH_DATA',
            payload: dataJSON._embedded.episodes,
        })
    }

    const toggleFavAction = (episode: IEpisode): IAction => {
        const episodeInFav: boolean = state.favourites.includes(episode)
        console.log(episodeInFav)

        let dispatchObj = {
            type: 'ADD_FAV',
            payload: episode,
        }

        if (episodeInFav) {
            const favWithoutEpisode = state.favouritesv.filter(
                (fav: IEpisode) => fav.id !== episode.id
            )

            dispatchObj = {
                type: 'REMOVE_FAV',
                payload: favWithoutEpisode,
            }
        }

        return dispatch(dispatchObj)
    }

    const props = {
        episodes: state.episodes,
        toggleFavAction,
        favourites: state.favourites,
    }

    console.log('state -', state)

    return (
        <>
            <header className="header">
                <div>
                    <h2>Rick and Morty Episode picker.</h2>
                    <p> Pick your favourite episode!</p>
                </div>
                <div>
                    <p> {`Number of favourites: ${state.favourites.length}`}</p>
                </div>
            </header>
            <React.Suspense fallback={<div> Loadding ... </div>}>
                <section className="episodeLayout">
                    <EpisodesList {...props} />
                </section>
            </React.Suspense>
        </>
    )
}

export default React.memo(App)
