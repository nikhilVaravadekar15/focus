import React from 'react'
import "./About.css"

function About() {

  return (
    <div className='About'>
      <div className="section">
        <div className="about__container">
          {/* header  */}
          <div className="about-container__header">
            <div className="header__titles">
              <h2>About Block Sites</h2>
              <p>Stay focused and improve your productivity. You can easily block any distracting or harmful website. No willpower necessary.</p>
            </div>
          </div>
          {/* body */}
          <div className="about-container__body">
            <div className="item create-block-list">
              <div className="item__subtitle">Create Block list</div>
              <div className="item__description">
                Add the websites you want to block to your Site List and get automatically redirected to safer, more positive sites. You can also add a list of friendly sites, and switch from blocking specific sites to only allowing certain sites to work.
              </div>
            </div>
            <div className="item categories">
              <div className="item__subtitle">Block Categories</div>
              <div className="item__description">
                Quickly block a whole category with a toggle of a button.
              </div>
            </div>
            <div className="item Incognito">
              <div className="item__subtitle">Incognito mode(Available only on Chrome)</div>
              <div className="item__description">
                All the Block Site functionality can also work in the incognito mode, you just need to allow it. Follow the instructions to see how it is done:
                <div
                  className="allow-in-incognito"
                  onClick={() => { window.open(chrome.runtime.getURL("allow-in-incognito.html")); }}
                >
                  Incognito Mode
                </div>
              </div>
            </div>
            <div className="item safe-internet">
              <div className="item__subtitle">Keep Your Internet Safe</div>
              <div className="item__description">
                Activate Adult Block via the extension menu to block all adult sites in a single click.
              </div>
            </div>
            <div className="item focus-time">
              <div className="item__subtitle">Block For Specific Times</div>
              <div className="item__description">
                Choose days and intervals in which you want Block Site to be active. Set up custom blocks based on your work schedule (for example: 09:00 - 17:00), so you won’t procrastinate during the day, when at work or at school.
              </div>
            </div>
            <div className="item rate-us">
              <div className="item__subtitle">Like us? Let The World Know.</div>
              <div className="item__description">
                If you Focus useful, please
                <a href="https://github.com/nikhilVaravadekar15/focus"><b>Star us on Github.</b></a>
                We would highly appreciate it.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default About
