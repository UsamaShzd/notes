import { Formik, Form, FormikHelpers } from "formik";
import InputField from "@/components/InputField";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import noteFormValidationSchema from "./noteFormValidationSchema";

export type NoteFormValuesType = { title: string; note: string };

export type NoteFormProps = {
  initialValues?: NoteFormValuesType;
  onSubmit?: (
    values: NoteFormValuesType,
    formikHelpers: FormikHelpers<NoteFormValuesType>,
  ) => void | Promise<any>;
  enableReinitialize?: boolean;
};

function NoteForm({
  initialValues = { title: "", note: "" },
  onSubmit = () => {},
  enableReinitialize = true,
}: NoteFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={noteFormValidationSchema}
      enableReinitialize={enableReinitialize}
    >
      {({ isSubmitting }) => {
        return (
          <Form>
            <InputField label="Title" name="title" />
            <InputField label="Note" name="note" as="textarea" />
            <Button type="submit" disabled={isSubmitting}>
              Submit
              {isSubmitting ? (
                <Spinner size="sm" variant="grow" className="ms-2" />
              ) : null}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default NoteForm;
