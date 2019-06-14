import React from 'react'
import { Store } from './Store'
import { IEpisodeProps } from './interfaces';
import { toggleFavAction } from './Actions'

const EpisodesList = React.lazy<any>(() => import('./EpisodesList'))

export default function FavPage() {
    const { state, dispatch } = React.useContext(Store)
    
    const props: IEpisodeProps = {
        episodes: state.episodes,
        toggleFavAction,
        favourites: state.favourites,
        store: { state, dispatch }
    }

    return (
        <React.Suspense fallback={<div> Loadding ... </div>}>
            <div className="episodeLayout">
                <EpisodesList {...props} />
            </div>
        </React.Suspense>
    )
}
