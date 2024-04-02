'use client'
import { API_URL } from '@/app/global';
import Spinner from '@/components/spinner';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { mutate } from 'swr';

const urlCourse = `${API_URL}/import/course`
const urlClass = `${API_URL}/import/class`
const urlClassUpdate = `${API_URL}/import/class-update`
const urlReport = `${API_URL}/import/report`

export default function page() {
    const [files, setFiles] = useState<any>(null);
    const [loading, setLoading] = useState(false)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(e.target.files);
        }
    };

    const handleUpload = async () => {
        let url = ''
        if (files) {
            setLoading(true)
            try {
                [...files].forEach(async (file) => {
                    const formData = new FormData();
                    formData.append('file', file);
                    if (file.name.includes('Nguyen')) {
                        url = urlCourse
                    }
                    if (file.name.includes('mapping')) {
                        url = urlClass
                    }
                    if (file.name.includes('info')) {
                        url = urlClassUpdate
                    }
                    if (file.name.includes('curri')) {
                        url = urlReport
                    }
                    console.log('url', url)
                    const res = await fetch(url, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': '*/*',
                        },
                    })
                    if (!res.ok) {
                        console.error("Error response:", res.status);
                        toast.error(`${file.name} creation failed`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    } else {
                        console.log(res);
                        console.log("Success response:");
                        toast.success(`${file.name} successfully upload`, {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        })
                    }
                });
                mutate('')
            } catch (error) {
                console.error(error);
            }
            setTimeout(() => {
                setLoading(false);
            }, 3000)
        }
    };

    return (
        <div className='bg-white rounded shadow-4xl h-[550px] p-4'>
            <div className="input-group">
                <div className="mb-3 w-96">
                    <label
                        htmlFor="formFileMultiple"
                        className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                    >
                        Multiple files input
                    </label>
                    <input
                        className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                        type="file"
                        id="formFileMultiple"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
            </div>
            {files &&
                [...files].map((file, index) => (
                    <section key={file.name}>
                        File number {index + 1} details:
                        <ul>
                            <li>Name: {file.name}</li>
                            <li>Type: {file.type}</li>
                            <li>Size: {file.size} bytes</li>
                        </ul>
                    </section>
                ))}

            {files && (
                <button onClick={handleUpload} className="submit bg-slate-400 w-[180px] max-h-[45px] h-[45px] text-white py-2 px-4 rounded mt-5">
                    {loading ? <Spinner /> : <span> Upload {files.length > 1 ? "files" : "a file"}</span>}
                </button>
            )}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
}
