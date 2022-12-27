import React from 'react'
import "./Incognito.css"
import IconIncognitoMode from "../../assets/images/incognito-mode.gif"

function Incognito() {
    return (
        <div className='Incognito'>
            <div className="image">
                <img src={IconIncognitoMode} alt="allow-in-incognito-mode" draggable="false" />
            </div>
            <div className="helper-text">
                <h2>allow in incognito mode</h2>
                <p>
                    <span>Open Chrome -&gt; Menu -&gt; More Tools -&gt; Extensions.</span> <br />
                    From the Extensions page, select the <span>Focus</span> extension to use in Incognito mode and enable it. If there is not an option to enable the extension in Incognito mode, then the extension may not work.
                </p>
            </div>
        </div>
    )
}

export default Incognito
