import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup.string().min(2).max(25).required("Please enter First name"),
  lastName: yup.string().min(2).max(25).required("Please enter Last name"),
  mobileNumber: yup.number().required("Please enter Number"),
  subject: yup.string().required("Please enter Subject"),
  message: yup.string().min(50).max(300).required("Please enter Message"),
  file: yup.object(),
});

export default schema;
