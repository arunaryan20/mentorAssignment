import React, { useEffect, useState } from 'react'
import { useReactMediaRecorder } from 'react-media-recorder'
import '../Components/Record.css'
export default function Record () {
  const [hasPermission, setHasPermission] = useState(false)
  const [ustream, setUStream] = useState(null)
  const [startbtn, setStartBtn] = useState(true)
  const [stopbtn, setStopBtn] = useState(true)
  const [rec, setRec] = useState(null)

  async function requestPermission () {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      setUStream(stream)
      const videoElement = document.querySelector('video#localVideo')
      videoElement.srcObject = stream
      setHasPermission(true)
      setStartBtn(false)
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm'
      })
      mediaRecorder.addEventListener('dataavailable', event => {
        const videoRecorded = document.querySelector('video#videoRecorded')
        videoRecorded.src = URL.createObjectURL(event.data)
      })
      setRec(mediaRecorder)
    } catch (error) {
      console.error('Permission denied:', error)
      setHasPermission(false)
    }
  }

  useEffect(() => {
    requestPermission()
  }, [])

  const startRecording = () => {
    rec.start()
    setStartBtn(true)
    setStopBtn(false)
  }

  const stopRecording = () => {
    rec.stop()
    setStartBtn(false)
    setStopBtn(true)
  }

  return (
    <div>
      <button disabled={startbtn} onClick={startRecording}>
        startRecording
      </button> &ensp;
      <button disabled={stopbtn} onClick={stopRecording}>
        stopRecording
      </button> &ensp;
      <video controls autoPlay loop id='localVideo' width='200' height='200' /> &ensp;
      <video controls playsinline id='videoRecorded' width="200" height="200" />
    </div>
  )
}
