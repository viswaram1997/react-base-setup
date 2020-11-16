import React, { Component } from 'react'
import { Button } from 'reactstrap';

export class AuthLayout extends Component {

    render() {

        let { children } = this.props

        return (
            <>
                <h1>    AuthLayout layout   </h1>
                { children }
                <Button color="danger">Danger!</Button>
            </>
        )
    }
}
