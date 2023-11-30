import { Suspense, useEffect, useState} from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'

import CanvasLoader from '../Loader'


const Computers = (props) => {
  const computer = useGLTF('../public/desktop_pc/scene.gltf')
  return (
    <mesh>
      <hemisphereLight intensity={0.8} groundColor="black"  />
      <pointLight intensity={1} />
      <primitive object={computer.scene} scale={props.isMobile ? 0.65 : 0.75} position={props.isMobile ? [0,-3.5, -1.6] : [0,-3.5,-1.5]} />
    </mesh>
  )
}


const computersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(()=> {
    const mediaQuery = window.matchMedia('(max-width: 500px)')

    setIsMobile(mediaQuery.matches)

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches)
    }

    mediaQuery.addEventListener('change', handleMediaQueryChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }
  }, [])

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
          <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default computersCanvas
