/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";

export class CheckIn extends Component {
  render() {
    return <div>CheckIn</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CheckIn);
