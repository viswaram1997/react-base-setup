import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { getHomePageDetails,getPageDetails } from "action/home"
import { LoaderWrapper } from "HOC/LoaderWrapper"
import { pageNavigationByName } from "helpers"
class LoginClass extends Component {

    state = {

    }
  
    render() {
        
        let { data = '' } = this.props
        
        return (
            <>
                Login {data}

                <button onClick={e=>pageNavigationByName({ params:{id:1 },name:'LoginDashboard' })}>Click</button>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.home.data
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getHomePageDetails
    }, dispatch)
}


let actions = ['getHomePageDetails',{ handler:getPageDetails,propsKey:'pageDetails' }]

let component = LoaderWrapper(LoginClass)({ actions })


export default connect(mapStateToProps, mapDispatchToProps)(component)
