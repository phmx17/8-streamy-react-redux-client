import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }
    renderActions() {
        const { id } = this.props.match.params  // some ES6

        return(   // must replace div with React.Fragment (or <>) otherwise messed up styling
            <>
                <button onClick={() => this.props.deleteStream(id) } className="ui button negative">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </>        
    )};
    renderContent() {
        if (!this.props.stream) {
            return 'Are you sure you want to delete this stream?'
        }
        return `Are you sure you want to delete stream: "${this.props.stream.title}" ?`
    }
    render() {
        return (                         
                <Modal 
                    title="X-- Delete Stream --X"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')}
                />          
        );
    };
}
const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]}
}
export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);
