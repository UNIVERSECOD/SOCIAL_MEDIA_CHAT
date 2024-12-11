import { PATHS } from "@/constants/paths";
import { forgotPassword } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const forgotPasswordSchema = Yup.object().shape({
   email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email address"),
});

const ForgotPasswordPage = () => {
const {mutateAsync} = useMutation({
  mutationFn: forgotPassword,
  onError: (error) => {
    const message = error.response?.data?.message ?? "Something went wrong";
    toast.error(message)
  },
  onSuccess: () => {
   toast.success("Email sent successfully")
  },
})

  async function handleSubmit (values, {setSubmitting}) {
    setSubmitting(true);
    await mutateAsync({ email: values.email });
    setSubmitting(false);
  }


  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://Flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          LoomNet
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-2 md:space-y-2 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot Your Password? 
            </h1>
            <p className="text-xs text-muted-foreground">
              Enter your registered email address below and we'll send you a password reset link.
            </p>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={forgotPasswordSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Enter your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    <p className="text-xs text-red-700 min-h-4">
                      {errors.email && touched.email && errors.email}
                    </p>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Get recovery email
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <Link
                      to ={ PATHS.REGISTER}
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign up
                    </Link>
                  </p>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
