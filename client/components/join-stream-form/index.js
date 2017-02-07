import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Gandalf from 'gandalf-validator';
import { Flex } from 'glamor/jsxstyle';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { setCurrentStream } from '../editor/editorActions';

class JoinStreamForm extends Gandalf {
  constructor() {
    const fields = {
      idInput: {
        component: TextField,
        validators: ['required'],
        errorPropName: 'errorText',
        props: {
          hintText: 'Enter Stream ID',
          style: { width: 'auto' },
        },
      },
    };

    super(fields);
  }

  handleSubmit() {
    const data = this.getCleanFormData();
    if (!data) return;

    this.props.setCurrentStream(data.idInput);
    if (this.props.onSubmitSuccess) this.props.onSubmitSuccess(data);
  }

  render() {
    const fields = this.state.fields;

    const flexDirection = this.props.stackVertical ? 'column' : 'row';
    const buttonPadding = this.props.stackVertical ? '1rem 0 0 0' : '0 0 0 1rem';
    const cta = this.props.cta || 'Get Coding';

    return (
      <Flex alignItems="center" flexDirection={flexDirection}>
        { fields.idInput.element }
        <Flex padding={buttonPadding}>
          <RaisedButton label={cta} primary onClick={() => this.handleSubmit()} />
        </Flex>
      </Flex>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setCurrentStream,
}, dispatch);

export default connect(null, mapDispatchToProps)(JoinStreamForm);
