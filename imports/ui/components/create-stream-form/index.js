import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Gandalf from 'gandalf-validator';
import { Flex } from 'glamor/jsxstyle';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { setCurrentStream } from '../../../redux/modules/editor';

class JoinStreamForm extends Gandalf {
  constructor() {
    const fields = {
      streamName: {
        component: TextField,
        validators: ['required'],
        errorPropName: 'errorText',
        props: {
          hintText: 'Stream Name',
          style: { width: 'auto' },
        },
      },
    };

    super(fields);
  }

  handleSubmit() {
    const data = this.getCleanFormData();
    if (!data) return;

    Meteor.call('createStream', data.streamName, (err, id) => {
      if (err) {
        console.log(err);
        return;
      }
      this.props.setCurrentStream({ id, name: data.streamName });
    });
  }

  render() {
    const fields = this.state.fields;

    return (
      <Flex alignItems="center">
        { fields.streamName.element }
        <Flex padding="1rem">
          <RaisedButton label="Create Stream" primary onClick={() => this.handleSubmit()} />
        </Flex>
      </Flex>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setCurrentStream,
}, dispatch);

export default connect(null, mapDispatchToProps)(JoinStreamForm);
