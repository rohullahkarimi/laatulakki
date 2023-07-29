import {
  OrbitControls,
  Stage,
} from "@react-three/drei";

import Ylioppilaslakki from "./Cap_version_7";
import { Suspense } from "react";


const ExperienceYlioppilaslakki = () => {



  return (
    <Suspense fallback={null}>
       <OrbitControls 
        //autoRotate 
        enableDamping 
        dampingFactor={0.1} 
        //rotateSpeed={0.2} 
        minDistance={0} // Set minimum distance for zooming in
        maxDistance={10} // Set maximum distance for zooming out
       />
        <Stage environment="city" intensity={0.6} castShadow={false}>
          <group>
            <Ylioppilaslakki />
          </group>
        </Stage>
    </Suspense>
  );
};

export default ExperienceYlioppilaslakki;