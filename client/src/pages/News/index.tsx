import React from "react";
//@ts-ignore
import ReactMarkdown from "react-markdown";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import alphaPic from "../../assets/alpha.png";
import { Button } from "@material-ui/core";
import { withRouter } from "react-router";

class News extends React.Component {
  state = { markdown: "" };
  componentDidMount() {
    let readmePath = null;
    try {
      //@ts-ignore
      readmePath = require(`./articles/${this.props.match.params.id}.md`);
    } catch (e) {
      //@ts-ignore
      console.error("Could not find file of id ", this.props.match.params.id);
    }
    if (readmePath) {
      fetch(readmePath)
        .then(response => {
          return response.text();
        })
        .then(text => {
          this.setState({
            markdown: text
          });
        });
    }
  }
  render() {
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
