import { Formik, Form, FormikHelpers } from "formik";
import InputField from "@/components/InputField";
import Button from "react-bootstrap/Button";
import noteFormValidationSchema from "./noteFormValidationSchema";

type NoteFormValuesType = { title: string; note: string };

export type NoteFormProps = {
  initialValues?: NoteFormValuesType;
  onSubmit?: ((
    values: NoteFormValuesType,
    formikHelpers: FormikHelpers<NoteFormValuesType>,
  ) => void | Promise<any>) &
    ((values: NoteFormValuesType) => void);
};

function NoteForm({
  initialValues = { title: "", note: "" },
  onSubmit = () => {},
}: NoteFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={noteFormValidationSchema}
    >
      {({ isSubmitting }) => {
        return (
          <Form>
            <InputField label="Title" name="title" />
            <InputField label="Note" name="note" as="textarea" />
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default NoteForm;
