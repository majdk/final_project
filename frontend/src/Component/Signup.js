import React, { Component } from 'react'


class Signup extends Component {
    state= {
        users: []
    }



  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-4">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Signup</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup