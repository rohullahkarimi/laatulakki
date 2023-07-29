import {
  OrbitControls,
  Stage,
} from "@react-three/drei";

import Chair from "./Chair";
import { Suspense } from "react";
//import Yolakki3D from "./Yolakki3D";

/*
import { Suspense } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
*/

//  <Yolakki3D/>
const Experience = () => {
  return (
    <Suspense fallback={null}>
       <OrbitControls 
        //autoRotate 
        enableDamping 
        dampingFactor={0.1} 
        //rotateSpeed={0.2} 
        minDistance={2} // Set minimum distance for zooming in
        maxDistance={10} // Set maximum distance for zooming out
       
       />
        <Stage environment="city" intensity={0.6} castShadow={false}>
          <Chair />
        </Stage>
    </Suspense>
  );
};

export default Experience;