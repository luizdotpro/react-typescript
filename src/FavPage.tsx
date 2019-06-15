import React from 'react'
import { Store } from './Store'
import { IEpisodeProps } from './interfaces';
import { toggleFavAction } from './Actions'

const EpisodesList = React.lazy<any>(() => import('./EpisodesList'))

export default function FavPage(): JSX.Element {
    const { state, dispatch } = React.useContext(Store)
    
    const props: IEpisodeProps = {
        episodes: state.favourites,
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
