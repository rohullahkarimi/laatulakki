import { useGLTF } from "@react-three/drei";

const useGLTFLoader = (path) => {
  const gltfResult = useGLTF(path);
  const { nodes, materials } = gltfResult;
  return { nodes, materials };
};

export default useGLTFLoader;

