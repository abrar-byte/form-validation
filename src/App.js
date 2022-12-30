import React, { useState } from "react";
import "./App.css";
import * as Yup from "yup";
import { useFormik } from "formik";

// Skema Validasi Formik
const registerSchema = Yup.object().shape({
  first_name: Yup.string()
    .max(255, "Nama maksimum berisi 255 karakter")
    .required("Nama harus diisi"),
  last_name: Yup.string()
    .max(255, "Nama maksimum berisi 255 karakter")
    .required("Nama harus diisi"),
  email: Yup.string()
    .email("Format email tidak valid")
    .min(3, "Email minimal berisi 3 karakter")
    .max(255, "Email maksimum berisi 255 karakter")
    .required("Email harus diisi"),
  password: Yup.string()
    .min(8, "Password minimal berisi 8 karakter")
    .max(255, "Password maksimum berisi 255 karakter")
    .required("Password harus diisi"),
  password_confirmation: Yup.string()
    .required("Password harus diisi")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref("password")], "Password tidak sama"),
    }),
  phone: Yup.string()
    .nullable()
    .matches(/^[0-9]+$/, "Nomor harus berupa angka")
    .min(7, "Nomor minimal 7 digit")
    .max(14, "Nomor maksimal 14 digit"),
});

// skema data awal formik
const initialValues = {
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  password: "",
  password_confirmation: "",
};

function App() {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [step, setStep] = useState(1);
  const [nama, setNama] = useState({
    nama: "",
    umur: "",
  });
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: registerSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      alert("Yey kamu berhasil login 😆!");
      setSubmitting(false);
      // ngehapus isi form
      resetForm();
    },
  });
  const handleChange = (e) => {
    setNama({
      ...nama,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-4 w-full max-w-md bg-white rounded-lg 0 shadow-lg sm:p-6 md:p-8 ">
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          {step === 1 && (
            <>
              <h5 className="text-xl font-medium text-red-600">
                Daftar Sekarang di Fazufi Academy
              </h5>
              <div>
                <input
                  className="border border-black"
                  type="text"
                  name="nama"
                  value={nama.nama}
                  onChange={handleChange}
                />
                <p>{nama.nama}</p>
              </div>
              <div>
                <input
                  className="border border-black"
                  type="text"
                  name="umur"
                  value={nama.umur}
                  onChange={handleChange}
                />
                <p>{nama.umur}</p>
              </div>
              <div>
                <input
                  type="text"
                  // name="first_name"
                  {...formik.getFieldProps("first_name")}
                  className="bg-gray-50 shadow-md text-gray-900 text-sm rounded-md  block w-full px-2.5 py-3 "
                  placeholder="Nama Depan"
                />
                {formik.touched.first_name && formik.errors.first_name && (
                  <p className="  text-rose-500  mt-2  text-xs">
                    {formik.errors.first_name}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  {...formik.getFieldProps("last_name")}
                  className="bg-gray-50 shadow-md text-gray-900 text-sm rounded-md  block w-full px-2.5 py-3 "
                  placeholder="Nama Belakang"
                />
                {formik.touched.last_name && formik.errors.last_name && (
                  <p className="  text-rose-500  mt-2  text-xs">
                    {formik.errors.last_name}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  {...formik.getFieldProps("email")}
                  className="bg-gray-50 shadow-md text-gray-900 text-sm rounded-md  block w-full px-2.5 py-3 "
                  placeholder="Email"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="  text-rose-500  mt-2  text-xs">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <button
                onClick={() => setStep(step + 1)}
                className="w-full uppercase text-white bg-red-500 hover:bg-red-800  font-medium rounded-md text-sm px-5 py-2.5 text-center shadow-lg "
              >
                Selanjutnya
              </button>
              <hr />
              <div className="text-sm text-center font-medium text-gray-500 dark:text-gray-300">
                Sudah punya akun?
                <span
                  onClick={() => alert("Fitur ini menyusul")}
                  className="text-red-600 ml-1 hover:text-red-500 cursor-pointer "
                >
                  Masuk
                </span>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div
                className="flex cursor-pointer"
                onClick={() => setStep(step - 1)}
              >
                {/* <ArrowLeft /> */}
                <h5 className="text-xl ml-1 font-medium text-red-600">
                  Kembali
                </h5>
              </div>
              <div>
                <input
                  type="number"
                  {...formik.getFieldProps("phone")}
                  className="bg-gray-50 shadow-md text-gray-900 text-sm rounded-md  block w-full px-2.5 py-3 "
                  placeholder="Nomor Telepon"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="  text-rose-500  mt-2  text-xs">
                    {formik.errors.phone}
                  </p>
                )}
              </div>
              <div className="relative  ">
                <input
                  type={show ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                  placeholder="Password"
                  className="bg-gray-50 shadow-md text-gray-900 text-sm rounded-md  block w-full px-2.5 py-3 "
                />
                <span
                  className="absolute top-3 right-3 text-red-600 hover:text-red-500 text-sm cursor-pointer"
                  onClick={() => setShow(!show)}
                >
                  {show ? "Hide" : "Show"}
                </span>
                {formik.touched.password && formik.errors.password && (
                  <p className="  text-rose-500  mt-2  text-xs">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <div className="relative  ">
                <input
                  type={showConfirm ? "text" : "password"}
                  {...formik.getFieldProps("password_confirmation")}
                  placeholder="Konfirmasi Password"
                  className="bg-gray-50 shadow-md text-gray-900 text-sm rounded-md  block w-full px-2.5 py-3 "
                />
                <span
                  className="absolute top-3 right-3 text-red-600 hover:text-red-500 text-sm cursor-pointer"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? "Hide" : "Show"}
                </span>
                {formik.touched.password_confirmation &&
                  formik.errors.password_confirmation && (
                    <p className="  text-rose-500  mt-2  text-xs">
                      {formik.errors.password_confirmation}
                    </p>
                  )}
              </div>

              <button
                disabled={formik.isSubmitting || !formik.isValid}
                type="submit"
                className="w-full uppercase text-white bg-red-500 hover:bg-red-800  font-medium rounded-md text-sm px-5 py-2.5 text-center shadow-lg disabled:opacity-50 "
              >
                Selanjutnya
              </button>
              <hr />
              <div className="text-sm text-center font-medium text-gray-500 dark:text-gray-300">
                Sudah punya akun?
                <span
                  // onClick={() => navigate("/login")}
                  className="text-red-600 ml-1 hover:text-red-500 cursor-pointer "
                >
                  Masuk
                </span>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
