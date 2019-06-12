import React from 'react'
import { IAction, IEpisode, IEpisodeProps } from './interfaces'
import { Store } from './Store'
import './index.css'

const EpisodesList = React.lazy<any>(() => import('./EpisodesList'))

export default function HomePage() {
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
            const favWithoutEpisode = state.favourites.filter(
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

    return (
        <React.Suspense fallback={<div> Loadding ... </div>}>
            <section className="episodeLayout">
                <EpisodesList {...props} />
            </section>
        </React.Suspense>
    )
}
