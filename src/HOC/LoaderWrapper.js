import React, { Component } from 'react'
import { convertStringToObject } from "service/helperFunctions"

let defaultProps = {
    page: 1, filter: '', search: ''
}


export const LoaderWrapper = WrappedComponent => {

    return props => {

        return class Temp extends Component {

            constructor(props) {
                super(props)
            }

            state = {
                loading: true,
                componentAPIprops:{}
            }

            componentWillMount() {

                callActions(props, this.props).then((data) => {
                    if (!props.loaderKey) {
                        this.setState({
                            loading: false,
                            componentAPIprops:data
                        })
                    }

                })
            }

            getComponentProps = () => {
                return {...this.props,...this.state.componentAPIprops}
            }

            componentWillReceiveProps(compProp) {
                if (props.loaderKey) {

                    if (this.isLoading(props, compProp)) {
                        this.setState({
                            loading: false
                        })
                    }

                }


            }

            isLoading = ({ loaderKey }, componentProps) => {
                return loaderKey.every((key) => componentProps[key] !== '')
            }       


            render() {


                let { loading } = this.state


                if (loading) {
                    //loader
                    return (
                        <div className="page-loader">
                            <div className="position-relative w-100 h-100">
                                <div className="loader-circle"></div>
                            </div>
                        </div>

                    )
                } else {

                    return (
                        <>
                            <WrappedComponent {...this.getComponentProps()} />

                        </>
                    )


                }

            }

        }
    }
}
//handling api call
const callActions = (props, componentProps) => {

    let { history = { location: { search: '' } } } = componentProps

    let query = convertStringToObject(history.location.search)   

    return new Promise((resolve, reject) => {

        Promise.all(props.actions.map((action) => {  
            
            if(typeof action === 'object'&&action.handler){
                
            return action.handler({...defaultProps, ...componentProps.match ? componentProps.match.params : {}, initialLoad: true, match: componentProps.match, ...query })

            }   

            return componentProps[action]({...defaultProps, ...componentProps.match ? componentProps.match.params : {}, initialLoad: true, match: componentProps.match, ...query })

        })).then((data) => {
            resolve(getDirectPropsRelatedData(data,props.actions))
        }).catch((data) => {

            resolve(true)

        })

    })

}

const getDirectPropsRelatedData = (data,actions) =>{

    let propsIndex = actions.map((action,index)=>{
        if(typeof action==='object' && action.handler){
            return index
        }
        return false 
    }).filter(Boolean)


    return propsIndex.reduce((acc,propIndex)=>{

        let propsLabel = actions[propIndex].propsKey

        acc[propsLabel] = data[propIndex]

        return acc
    },{})

}