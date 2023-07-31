
import { useForm } from "react-hook-form"
import axios from 'axios'
import { ISignup } from "../../interfaces/auth"
import Swal from "sweetalert2"
import { RootState, useAppDispatch } from "../../store"
import { signupAPI } from "../../asyncThunk/user"
import { useSelector } from "react-redux"
import { isLoadingForm } from "../../sliceRedux/chat.slice"
import { useNavigate } from "react-router-dom"
const FormSignup = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isLoading = useSelector((state: RootState) => state.chat.isLoading)

    const { register, handleSubmit, formState: { } } = useForm<ISignup>({})

    const onSubmit = async (data: any) => {
        dispatch(isLoadingForm(true))
        const file = data.images[0]; //Lấy ảnh từ form
        try {
            // Upload ảnh lên Cloudinary
            const CLOUD_NAME = "doa7mkkpq";
            const PRESET_NAME = "upload";
            const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`; // Thay thế với giá trị của bạn
            const formData = new FormData();
            formData.append("upload_preset", PRESET_NAME);
            formData.append("file", file);
            // gửi lên cloudinary
            const response = await axios.post(
                api,
                formData
            );
            // Tạo 1 oject mới
            const newData = {
                name: data.name,
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword,
                images: response.data.secure_url // lấy link ảnh từ cloudinary trả về
            }
            dispatch(signupAPI(newData))
            navigate("/signin")
        } catch (error: any) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'error',
                title: error.message,
            })
        }
    }
    return (
        <div className="formSignup w-[800px] mx-auto bg-white p-10 mt-4 shadow-2xl">
            <h1 className="text-center mt-10 text-3xl">Form Signup</h1>
            <form className="mt-9" onSubmit={handleSubmit(onSubmit)}>
                <div className="relative z-0 w-full mb-9 group">
                    <input  {...register('name')} type="text" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-900 focus:outline-none focus:ring-0 focus:border-blue-100 peer" placeholder=" " required />
                    <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-lg text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                </div>
                <div className="relative z-0 w-full mb-9 group">
                    <input   {...register('email')} type="email" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-900 focus:outline-none focus:ring-0 focus:border-blue-100 peer" placeholder=" " required />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-xl text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9">Email address</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input  {...register('password')} type="password" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-900 focus:outline-none focus:ring-0 focus:border-blue-100 peer" placeholder=" " required />
                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-lg text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input {...register('confirmPassword')} type="password" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-900 focus:outline-none focus:ring-0 focus:border-blue-100 peer" placeholder=" " required />
                    <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-lg text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input {...register('images')} type="file" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-900 focus:outline-none focus:ring-0 focus:border-blue-100 peer" placeholder=" " required />
                    <label htmlFor="floating_repeat_iamges" className="peer-focus:font-medium absolute text-lg text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Images</label>
                </div>
                {isLoading ? <>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-lg w-full sm:w-full px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <div role="status" className="mx-auto">
                            <svg aria-hidden="true" className="w-8 h-8 mx-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>
                    </button>
                </> : <>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-lg w-full sm:w-full px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Signup</button>
                </>}
                <h2 className="text-center mt-5">Do you already have an account?  <a href="/signin" className="text-blue-800 text-xl underline decoration-1">Login</a></h2>
            </form>
        </div >
    )
}

export default FormSignup