import React from 'react';

/**
 * A card panel on the DOM showing the initial tweet data
 */
class MainCard extends React.Component {
    constructor(props) {
        super(props);

        this.openDropdown = this.openDropdown.bind(this);
        this.dropdownClicked = this.dropdownClicked.bind(this);

        this.state = {dropdown: false,
                      numberLabel: "20 Tweets",
                      numTweets: 20};
    }

    render() {
        const tweets = this.props.twitter.tweets;

        const headerLabel = this.props.headerLabel;
        const handle = this.props.twitter.handle;

        const handleChanged = this.props.onHandleChanged;
        const fetchTweets = this.props.fetchTweets;

        const dropdownClass = this.state.dropdown ? 'is-active' : '';

        const numTweets = tweets.length === 0 ? 0 : tweets[tweets.length - 1].length + (tweets.length - 1) * 2;
        const tweetStatusLabel =`${numTweets} tweets loaded.`;

        return (
            <div className="column">
                <div className="section">
                  <div className="card">
                    <div className="card-header">
                        <p className="card-header-title">{headerLabel}</p>
                    </div>
                    <div className="card-content">
                      <div className="content">
                          <div className="control">
                              <h4 className="handle-prefix">@</h4>
                              <input className="input" id="handle-input" type="text" placeholder=""
                                     defaultValue={handle} onChange={() => handleChanged($("#handle-input").val())} />
                              <div className={"dropdown " + dropdownClass}>
                                  <div className="dropdown-trigger">
                                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={this.openDropdown}>
                                      <span id="tweet-number-label">{this.state.numberLabel}</span>
                                      <span className="icon is-small">
                                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                                      </span>
                                    </button>
                                  </div>
                                  <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                    <div className="dropdown-content">
                                      <a href="#" data-value="10" className="dropdown-item" onClick={() => this.dropdownClicked(10)}>
                                        10 Tweets
                                      </a>
                                      <a href="#" data-value="20" className="dropdown-item" onClick={() => this.dropdownClicked(20)}>
                                        20 Tweets
                                      </a>
                                      <a href="#" data-value="50" className="dropdown-item" onClick={() => this.dropdownClicked(50)}>
                                        50 Tweets
                                      </a>
                                      <a href="#" data-value="100" className="dropdown-item" onClick={() => this.dropdownClicked(100)}>
                                        100 Tweets
                                      </a>
                                    </div>
                                  </div>
                              </div>
                              <input className="button" type="submit" value="Fetch" onClick={() => fetchTweets(handle, this.state.numTweets)} />
                          </div>
                          <div className="body-label">
                              <h4>{tweetStatusLabel}</h4>
                          </div>
                          <div id="progress" className="hide">
                              <progress className="progress is-primary" max="100" />
                          </div>
                      </div>
                    </div>
                  <br />
                  </div>
                </div>
            </div>
        )
    }

    /**
     * Opens the dropdown menu when it's clicked on
     */
    openDropdown() {
        this.setState({dropdown: !this.state.dropdown});
    }

    /**
     * Updates the component's state with the selected number of tweets
     *
     * @param value {number}: The value of the dropdown that was selected
     */
    dropdownClicked(value) {
        this.setState({dropdown: false,
                       numberLabel: `${value} Tweets`,
                       numTweets: value})
    }
}

export default MainCard;