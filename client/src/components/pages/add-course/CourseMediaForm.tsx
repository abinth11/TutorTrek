import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

type CourseMediaFormProps = {
  onSubmit: (formData: any) => void;
};

const CourseMediaForm: React.FC<CourseMediaFormProps> = ({ onSubmit }) => {
  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    introductionVideo: Yup.mixed().required("Introduction video is required"),
    thumbnail: Yup.mixed().required("Thumbnail is required"),
  });

  // Define the initial form values
  const initialValues = {
    introductionVideo: null,
    thumbnail: null,
  };

  // Define state variables to store the selected video and thumbnail
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = (values: any) => {
    onSubmit(values);
    // Perform the necessary actions with the form values
  };

  // Handle video selection
  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setSelectedVideo(URL.createObjectURL(file));
    }
  };

  // Handle thumbnail selection
  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setSelectedThumbnail(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-md mx-auto pt-10">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-6">
            <label htmlFor="introductionVideo" className="block font-bold mb-1">
              Introduction Video
            </label>
            <Field name="introductionVideo">
              {({ form }: { form: any }) => (
                <>
                  <input
                    type="file"
                    id="introductionVideo"
                    onChange={(event) => {
                      form.setFieldValue("introductionVideo", event.currentTarget.files?.[0]);
                      handleVideoChange(event);
                    }}
                    className="border border-gray-300 px-3 py-2 rounded-lg w-full"
                  />
                  <ErrorMessage
                    name="introductionVideo"
                    component="div"
                    className="text-red-500"
                  />
                  {selectedVideo && (
                    <video src={selectedVideo} controls className="mt-2" />
                  )}
                </>
              )}
            </Field>
          </div>

          <div className="mb-4">
            <label htmlFor="thumbnail" className="block font-bold mb-1">
              Thumbnail
            </label>
            <Field name="thumbnail">
              {({ form }: { form: any }) => (
                <>
                  <input
                    type="file"
                    id="thumbnail"
                    onChange={(event) => {
                      form.setFieldValue("thumbnail", event.currentTarget.files?.[0]);
                      handleThumbnailChange(event);
                    }}
                    className="border border-gray-300 px-3 py-2 rounded-lg w-full"
                  />
                  <ErrorMessage
                    name="thumbnail"
                    component="div"
                    className="text-red-500"
                  />
                  {selectedThumbnail && (
                    <img src={selectedThumbnail} alt="Thumbnail" className="mt-2" />
                  )}
                </>
              )}
            </Field>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

