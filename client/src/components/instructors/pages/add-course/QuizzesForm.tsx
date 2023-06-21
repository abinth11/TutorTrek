import React from "react";
import { Formik, Field, FieldArray, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
const QuizzesForm:React.FC = () =>{
    const validationSchema = Yup.object().shape({
        questions: Yup.array().of(
          Yup.object().shape({
            question: Yup.string().required("Question is required"),
            options: Yup.array()
              .of(
                Yup.object().shape({
                  option: Yup.string().required("Option is required"),
                  isCorrect: Yup.boolean().required("Specify if the option is correct"),
                })
              )
              .required("At least one option is required"),
          })
        ),
      });
    
      const initialValues = {
        questions: [
          {
            question: "",
            options: [{ option: "", isCorrect: false }],
          },
        ],
      };
    
      const handleSubmit = (values: any) => {
        console.log(values);
      };
    
      return (
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Add Quiz Questions</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form>
                <FieldArray name="questions">
                  {({ push, remove: removeQuestion }) => (
                    <div>
                      {values.questions.map((_, index) => (
                        <div key={index} className="mb-4">
                          <div className="mb-2">
                            <label htmlFor={`questions.${index}.question`} className="block font-bold mb-1">
                              Question {index + 1}
                            </label>
                            <Field
                              type="text"
                              id={`questions.${index}.question`}
                              name={`questions.${index}.question`}
                              className="border border-gray-300 px-3 py-2 rounded-lg w-full"
                            />
                            <ErrorMessage
                              name={`questions.${index}.question`}
                              component="div"
                              className="text-red-500"
                            />
                          </div>
    
                          <FieldArray name={`questions.${index}.options`}>
                            {({ push: pushOption, remove: removeOption }) => (
                              <div>
                                {values.questions[index].options.map((_, optionIndex) => (
                                  <div key={optionIndex} className="mb-2">
                                    <div className="flex items-center">
                                      <Field
                                        type="text"
                                        id={`questions.${index}.options.${optionIndex}.option`}
                                        name={`questions.${index}.options.${optionIndex}.option`}
                                        className="border border-gray-300 px-3 py-2 rounded-lg w-full"
                                      />
                                      <Field
                                        type="checkbox"
                                        id={`questions.${index}.options.${optionIndex}.isCorrect`}
                                        name={`questions.${index}.options.${optionIndex}.isCorrect`}
                                        className="ml-2"
                                      />
                                      <label htmlFor={`questions.${index}.options.${optionIndex}.isCorrect`} className="ml-1">
                                        Correct
                                      </label>
                                    </div>
                                    <ErrorMessage
                                      name={`questions.${index}.options.${optionIndex}.option`}
                                      component="div"
                                      className="text-red-500"
                                    />
    
                                    <button
                                      type="button"
                                      onClick={() => removeOption(optionIndex)}
                                      className="text-red-500 mt-2"
                                    >
                                      Remove Option
                                    </button>
                                  </div>
                                ))}
                                <button
                                  type="button"
                                  onClick={() => pushOption({ option: "", isCorrect: false })}
                                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                >
                                  Add Option
                                </button>
                              </div>
                            )}
                          </FieldArray>
    
                          <button
                            type="button"
                            onClick={() => removeQuestion(index)}
                            className="text-red-500 mt-2"
                          >
                            Remove Question
                          </button>
    
                          <hr className="my-4" />
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          push({ question: "", options: [{ option: "", isCorrect: false }] })
                        }
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                      >
                        Add Question
                      </button>
                    </div>
                  )}
                </FieldArray>
    
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
                >
                  Add Quiz
                </button>
              </Form>
            )}
          </Formik>
        </div>
      );
}
export default QuizzesForm