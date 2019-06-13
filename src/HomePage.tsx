import React from 'react'
import { Store } from './Store'
import './index.css'
import { fetchDataAction, toggleFavAction } from './Actions'

const EpisodesList = React.lazy<any>(() => import('./EpisodesList'))

export default function HomePage() {
    const { state, dispatch } = React.useContext(Store)

    React.useEffect(() => {
        state.episodes.length === 0 && fetchDataAction(dispatch)
        console.log('useEffect hook')
    })

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
