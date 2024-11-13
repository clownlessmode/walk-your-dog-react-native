import ContactSupport from '@features/contact-support/ContactSupport'
import Form from '@features/sign-up-sitter/Form'
import ScrollContainer from '@shared/ui/containers/ScrollContainer'
import Header from '@shared/ui/header/Header'
import React from 'react'
import { Text, View } from 'react-native'

function SignUpSitter() {
  return (
    <ScrollContainer header={<Header>Давайте знакомиться!</Header>}>
        <Form />
        <ContactSupport />
    </ScrollContainer>
  )
}

export default SignUpSitter