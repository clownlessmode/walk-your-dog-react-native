import ContactSupport from "@features/contact-support/ContactSupport"
import Form from "@features/verify-sms/Form"
import ScreenContainer from "@shared/ui/containers/ScreenContainer"
import Logotype from "@shared/ui/logotype/Logotype"

function VerifySms() {
  return (
    <ScreenContainer style={{justifyContent: "space-around"}}>
        <Logotype />
        <Form />
        <ContactSupport />
    </ScreenContainer>
  )
}

export default VerifySms