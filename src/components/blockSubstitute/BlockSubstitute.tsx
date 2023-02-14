import React from 'react'
import "./BlockSubstitute.css"

type TBlockSubstitute = {
    coverup_image: string
}
function BlockSubstitute({ coverup_image }: TBlockSubstitute) {
    return (
        <div className="BlockSubstitute">
            <div className="substitute__image">
                <img src={coverup_image} alt="substitute-image" draggable="false" />
            </div>
            <div className="substitute__text">
                <div className="substitute__text__title">No blocked sites yet</div>
                <div className="substitute__text__description">When you add sites to block, you’ll see it here.</div>
            </div>
        </div>
    )
}

export default BlockSubstitute
