/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.4 public/models/cap_version_0.gltf
*/

import { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useCustomization } from "../contexts/Customization";


function Ylioppilaslakki(props) {
  const textMeshRef = useRef();

  const { nodes, materials } = useGLTF('./models/cap_version_5.gltf')
  //const { badge, legs, roundRibbonColor, cordColor } = useCustomization();
  const { badge } = useCustomization();
 

  

     
  useEffect(() => {
    // The GLTF model has finished loading here, so the textMeshRef should be set properly
    if (textMeshRef.current) {
      //console.log('Text mesh exists and is ready!');
      // Now you can call changeText or do any other operations with the textMeshRef.current
      changeText();
    }
  }, [textMeshRef]);

  const changeText = () => {
    console.log(textMeshRef.current); // Check the value in the console
    if (textMeshRef.current) {
      console.log('yes');
      //textMeshRef.current.geometry.setText('Nice'); // Replace 'New Text' with your desired text
    } else {
      console.log('Text mesh not available yet');
    }
  };

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Retopo_Text.geometry} material={materials['Material.002']} />
      <mesh geometry={nodes.Retopo_Text001.geometry} material={materials['Material.002']} position={[0, 0, 0.003]} />
      <mesh geometry={nodes.Retopo_Text002.geometry} material={materials['Material.002']} position={[0, 0, -0.002]} />
      <mesh geometry={nodes.sloejfe.geometry} material={materials.sloejfe_m} />
      <mesh geometry={nodes.the_top_of_the_cap_.geometry} material={materials['outside white']} />
      <mesh geometry={nodes.the_middle_part_.geometry} material={materials['outside black']} />
      <mesh geometry={nodes.the_fornt_part.geometry} material={materials['outide black 1']} />
      <mesh geometry={nodes.stribe1.geometry} material={materials.stribe} />
      <mesh geometry={nodes.the_white_inside.geometry} material={materials['inside white with fold']} />
      <mesh geometry={nodes.the_leather_part.geometry} material={materials['inside leather']} />
      <mesh geometry={nodes.the_top_inside.geometry} material={materials['inside white 1']} />
      <mesh geometry={nodes.the_line_in_the_bottom.geometry} material={materials['inside black']} />
      <mesh geometry={nodes.cap_line_1.geometry} material={materials['line 2']} />
      <mesh geometry={nodes.cap_line_2.geometry} material={materials['line 1']} />
      <group scale={0.071}>
        <mesh geometry={nodes.Plane003.geometry} material={materials['Material.003']} />
        <mesh geometry={nodes.Plane003_1.geometry} material={materials['diamond.001']} />
      </group>
      <mesh geometry={nodes.first_002.geometry} material={materials['Material.005']} />
      <mesh geometry={nodes.Diamond001.geometry} material={materials['diamond.001']} />
      <mesh geometry={nodes.Diamond001_1.geometry} material={materials.gold} />
    </group>
  )
}

export default Ylioppilaslakki;


useGLTF.preload('./models/cap_version_5.gltf')