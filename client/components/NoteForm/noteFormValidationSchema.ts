import * as Yup from "yup";

const noteFormValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(1, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  note: Yup.string()
    .min(20, "Too Short!")
    .max(300, "Too Long!")
    .required("Required"),
});

export default noteFormValidationSchema;
