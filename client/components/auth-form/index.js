import React from 'react';
import { connect } from 'react-redux';
import Gandalf from 'gandalf-validator';
import { Flex } from 'glamor/jsxstyle';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class AuthForm extends Gandalf {
  constructor() {
    const fields = {
      username: {
        component: TextField,
        validators: ['required'],
        errorPropName: 'errorText',
        props: {
          floatingLabelText: 'Username',
        },
      },
      password: {
        component: TextField,
        validators: ['required'],
        errorPropName: 'errorText',
        props: {
          floatingLabelText: 'Password',
          type: 'password',
        },
      },
    };

    super(fields);
  }

  handleSubmit() {
    const data = this.getCleanFormData();
    if (!data) return;
    if (this.props.onSubmit) this.props.onSubmit(data);
  }

  render() {
    const fields = this.state.fields;
    const cta = this.props.cta || 'Provide a CTA, damnit';

    return (
      <Flex alignItems="center" flexDirection="column">
        { fields.username.element }
        { fields.password.element }
        <Flex padding="20px">
          <RaisedButton label={cta} primary onClick={() => this.handleSubmit()} />
        </Flex>
      </Flex>
    );
  }
}

export default connect(null, null)(AuthForm);
