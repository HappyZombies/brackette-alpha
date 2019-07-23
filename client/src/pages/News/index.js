import React from "react";
//@ts-ignore
import ReactMarkdown from "react-markdown";
import { withRouter } from "react-router";
import Loading from "../../components/Loading";

class News extends React.Component {
  state = { markdown: "", pending: true };
  componentDidMount() {
    let readmePath = null;
    try {
      readmePath = require(`./articles/${this.props.match.params.id}.md`);
    } catch (e) {
      console.error("Could not find file of id ", this.props.match.params.id);
      this.setState({
        pending: false
      });
    }
    if (readmePath) {
      fetch(readmePath)
        .then(response => {
          return response.text();
        })
        .then(text => {
          this.setState({
            markdown: text,
            pending: false
          });
        });
    }
  }
  render() {
    if (this.state.pending) {
      return <Loading />;
    }
    if (!this.state.markdown) {
      return (
        <div className="pref-container">
          <h1>News article not found :( </h1>
        </div>
      );
    }
    return (
      <div className="pref-container">
        <ReactMarkdown source={this.state.markdown} />
      </div>
    );
  }
}

//@ts-ignore
export default withRouter(News);
