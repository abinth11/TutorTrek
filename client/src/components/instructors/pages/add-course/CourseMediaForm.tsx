import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const CourseMediaForm: React.FC = () => {
  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    introductionVideo: Yup.string().required("Introduction video is required"),
    thumbnail: Yup.string().required("Thumbnail is required"),
  });

  // Define the initial form values
  const initialValues = {
    introductionVideo: "",
    thumbnail: "",
  };

  // Define state variables to store the selected video and thumbnail
  const [selectedVideo, setSelectedVideo] = useState("");
  const [selectedThumbnail, setSelectedThumbnail] = useState("");

  // Handle form submission
  const handleSubmit = (values: any) => {
    console.log(values);
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
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Course Media</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-4">
            <label htmlFor="introductionVideo" className="block font-bold mb-1">
              Introduction Video
            </label>
            <Field
              type="file"
              id="introductionVideo"
              name="introductionVideo"
              onChange={handleVideoChange}
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
          </div>

          <div className="mb-4">
            <label htmlFor="thumbnail" className="block font-bold mb-1">
              Thumbnail
            </label>
            <Field
              type="file"
              id="thumbnail"
              name="thumbnail"
              onChange={handleThumbnailChange}
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
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Media
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default CourseMediaForm;
