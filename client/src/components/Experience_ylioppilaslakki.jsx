import React from 'react'; // Make sure you have this import
import {
  OrbitControls,
  Stage,
  useGLTF,
} from "@react-three/drei";

//import Ylioppilaslakki from "./Ylioppilaslakki_component";
import Ylioppilaslakki from "./Cap_versions";
import { Suspense } from "react";


const ExperienceYlioppilaslakki = () => { 


  // Preload the GLTF model

  //useGLTF("/public/models/cap_version_14.gltf");
  useGLTF("/public/models/cap_version_14-transformed.glb");

  return (
    <Suspense fallback={null}>
       <OrbitControls 
        //autoRotate 
        enableDamping 
        dampingFactor={0.1}  
        rotateSpeed={0.3} 
        zoomSpeed={0.4}
        minDistance={1} // Set minimum distance for zooming in
        maxDistance={8} // Set maximum distance for zooming out
       />
         <pointLight position={[10, 10, 10]} />
        <Stage environment="city" intensity={0.6} castShadow={false}>
          <group>
            <Ylioppilaslakki />
          </group>
        </Stage>
    </Suspense>
  );
};

export default ExperienceYlioppilaslakki;