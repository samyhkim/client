import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions";

class StreamList extends React.Component {
  // Grabs all streams from API server upon component initialization
  componentDidMount() {
    this.props.fetchStreams();
  }

  // Helper function to compare the user ID of the stream that we are iterating over with this.props.userId
  // Allows current user to execute administrative actions such as edit and delete their own streams
  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  // Renders list of streams in state
  renderList() {
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>

            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  // Renders 'Create Stream' button if user is signed in
  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // Takes object as an argument and inserts all the different values into an array
    streams: Object.values(state.streams),
    // Allows our component to know the ID of the user who is currently signed into the application
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

// Allows component to use fetchStreams action creator
export default connect(mapStateToProps, { fetchStreams })(StreamList);
