import React from 'react'

const LoginView = () => {
  return (
    <div className="center-block">
      <form>
        <div className="col-lg-2 col-md-1 col-sm-1" />
        <div className="col-sm-10 col-lg-8 panel panel-default center-block">
          <div className="form-group panel-body center-block">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email" ></input>
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group panel-body center-block">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"/>
          </div>
          <div className="col-sm-10 col-lg-8 panel-body center-block">
            <div className="btn-toolbar">
              <button type="submit" className="btn btn-primary center">Submit</button>
              <button type="cancel" className="btn btn-default center">Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginView