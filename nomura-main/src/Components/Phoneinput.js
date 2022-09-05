
import PhoneInput from 'react-phone-number-input/input'
import React, { useState } from "react";

function Phone() {
  // `value` will be the parsed phone number in E.164 format.
  // Example: "+12133734253".
  const [value, setValue] = useState()
  // If `country` property is not passed
  // then "International" format is used.
  // Otherwise, "National" format is used.
  return (
    <PhoneInput
    placeholder="Enter phone number"
      value={value}
      onChange={setValue} />
  )
}
export default Phone