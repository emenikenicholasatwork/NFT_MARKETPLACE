"use client"
import { RotatingTriangles } from "react-loader-spinner"
import '../globals.css'

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
        <RotatingTriangles
        visible={true}
        height="200"
        width="200"
        color="#4fa94d"
        ariaLabel="rotating-triangles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
    </div>
  )
}
export default loading