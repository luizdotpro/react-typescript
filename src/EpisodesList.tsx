import React from 'react'
import { IEpisode } from './interfaces'

export default function EpisodesList(props: any): Array<JSX.Element> {
    const { episodes, toggleFavAction, favourites, store } = props

    const { state, dispatch } = store
    return episodes.map((episode: IEpisode) => {
        if (episode.image) {
            return (
                <section key={episode.id} className="episodeBox">
                    <img src={episode.image.medium} alt={`Rick and Morty ${episode.name}`} />
                    <div>{episode.name}</div>
                    <section style={{ display: 'flex', justifyContent: 'space-between'}}>
                        Season: {episode.season} Number: {episode.number}
                    </section>
                    <button type="button" onClick={() => toggleFavAction(state, dispatch, episode)}>
                        {favourites.includes(episode) ? 'Unfavourite' : 'Favourite'}
                    </button>
                </section>
            )
        } else {
            return null
        }
    })
}
