import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { fetchStream, editStream } from "../../actions";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit(formValues) {
    this.props.editStream(this.props.match.params.id, formValues);
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field></Field>
        <Field></Field>
        <button></button>
      </form>
    );
  }
}

// ownProps gives us access to StreamEdit's default props passed down from Router
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamEdit);
